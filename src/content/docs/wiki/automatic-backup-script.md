---
title: "Automatic backup script"
slug: "wiki/automatic-backup-script"
tableOfContents: false
---

<nav data-pagefind-ignore class="wiki-source-toc" aria-label="Article sections"><details open><summary>On this page</summary><ul><li><a href="#common-requirements-and-backup-strategy">Common requirements and backup strategy</a></li><li><a href="#bisq1">Bisq1</a></li><li><a href="#linux">Linux</a></li><li><a href="#windows">Windows</a></li><li><a href="#macos">MacOS</a></li><li><a href="#bisq2">Bisq2</a></li><li><a href="#linux-2">Linux</a></li><li><a href="#windows-2">Windows</a></li><li><a href="#macos-2">MacOS</a></li></ul></details></nav>

<div class="wiki-recovered-article" lang="en"><p>The biggest issues for users happen when data files are lost or corrupted, leading to missing or borked trades, or unrecoverable Delayed Payout Transactions.</p>
<p>Having an automated backup solution helps covering that risk, by removing the need to manually run a backup after every application state change (mainly "offer created", "trade started", "trade completed").</p>
<p>Issues could still happen when a critical event occurs right after a state change was saved to disk, and before an automated backup was taken, but there are strategies to mitigate that possibility, which will be discussed.</p>
<span class="wiki-legacy-anchor" id="Common_requirements_and_backup_strategy" aria-hidden="true"></span><h2 id="common-requirements-and-backup-strategy"> Common requirements and backup strategy </h2>
<p>All scripts require 7z compression (7-zip on Windows, p7zip-full on Linux, p7zip on MacOS).</p>
<p>The provided code will backup all functional files in the data directory, leaving out non-unique files that the Bisq application will fetch/re-create autonomously, and compress them into a 7zip archive, keeping the number of last backups that you define, while deleting the oldest one(s) if the existing number of backups is higher.</p>
<p><strong>Review before scheduling:</strong> these scripts use fixed file lists, so verify that they cover your installed release and test restoration into a separate directory. Copying live files is not a guaranteed consistent snapshot; prefer a copy made while Bisq is closed. The examples do not check every archive command for success before reporting completion or deleting old backups: disable rotation until creation and archive testing succeed, and keep a known-good independent copy. The Unix rotation starts at the Nth file, so it retains one fewer archive than <code>BACKUP_COUNT</code>; a corrected rotation must start at N+1 and still check archive success before deleting anything. Compression alone does not encrypt the backup, and <code>-spf</code> stores full paths, so inspect extraction paths before restoring.</p>
<p>It is advised that you direct the backups to either an external drive, or a NAS, or an encrypted cloud storage.</p>
<p>Depending on how bulletproof of a backup schedule you want, you can increase the number of backups to keep on disk to 10 or more (the size of each depends on the history of your instance, but it usually resides in a few tens of MB, often less) and the frequency the script runs with, for example every 1 or 2 hours.</p>
<span class="wiki-legacy-anchor" id="Bisq1" aria-hidden="true"></span><h2 id="bisq1"> Bisq1 </h2>
<span class="wiki-legacy-anchor" id="Linux" aria-hidden="true"></span><h3 id="linux"> Linux </h3>
<p>Create a <code class="wiki-source-code" id="source-code-1">scripts</code> folder in your <code class="wiki-source-code" id="source-code-2">home</code> directory, prepare an executable file and open it with an editor:</p>
<pre><code class="wiki-source-code" id="source-code-3">
cd ~
mkdir -p scripts
cd scripts
touch bisq1backup
chmod +x bisq1backup
nano bisq1backup
</code></pre>
<p>paste the following code in the file, and edit where needed:</p>
<pre><code class="wiki-source-code" id="source-code-4">
#!/bin/bash
&#10;# ==== EDIT THE FOLLOWING ====
SOURCE_DIR="/home/YOURUSERNAME/.local/share/Bisq/btc_mainnet"
TARGET_FOLDER="/mnt/BACKUPS/BISQ1"
BACKUP_COUNT=4
# ============================
&#10;ARCHIVE_ROOT="bisq1_backup_"
BACKUP_FILE="${ARCHIVE_ROOT}$(date +%Y%m%d_%H%M%S).7z"
ARCHIVE_PATH="${TARGET_FOLDER}/${BACKUP_FILE}"
SELECTED_FILES=(
"BsqSwapTrades"
"BallotList"
"DisputeList"
"RefundDisputeList"
"SequenceNumberMap"
"MyVoteList"
"OpenOffers"
"MyBlindVoteList"
"ClosedTrades"
"MediationDisputeList"
"MyProposalList"
"MailboxMessageList"
"AccountAgeWitnessStore"
"PendingTrades"
"MyProofOfBurnList"
"PreferencesPayload"
"UserPayload"
"AddressEntryList"
"FailedTrades"
"MyReputationList"
"TempProposalStore"
"NavigationPath"
"UnconfirmedBsqChangeOutputList"
"IgnoredMailboxMap"
"PeerList"
"RemovedPayloadsMap"
"TradeStatistics3Store"
"SignedWitnessStore"
)
&#10;FOLDER_KEYS="keys"
FOLDER_WALLET="wallet"
FOLDER_TOR="tor/hiddenservice"
&#10;FILE_LIST=$(mktemp)
&#10;SUBFOLDER_DB_PATH="$SOURCE_DIR/db"
for file in "${SELECTED_FILES[@]}"; do
  if [ -f "$SUBFOLDER_DB_PATH/$file" ]; then
    echo "$SUBFOLDER_DB_PATH/$file" &gt;&gt; "$FILE_LIST"
  fi
done
&#10;for subfolder in "$FOLDER_KEYS" "$FOLDER_WALLET"; do
  find "$SOURCE_DIR/$subfolder" -maxdepth 1 -type f &gt;&gt; "$FILE_LIST"
done
&#10;FOLDER_TOR_PATH="$SOURCE_DIR/$FOLDER_TOR"
if [ -d "$FOLDER_TOR_PATH" ]; then
  find "$FOLDER_TOR_PATH" -type f &gt;&gt; "$FILE_LIST"
fi
&#10;7z a -t7z -mx=9 -m0=lzma2 -mmt=on -spf "$ARCHIVE_PATH" @"$FILE_LIST"
&#10;rm "$FILE_LIST"
&#10;echo "Backup completed: $BACKUP_FILE"
&#10;ARCHIVE_COUNT=$(find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | wc -l)
&#10;if [ "${ARCHIVE_COUNT}" -gt "${BACKUP_COUNT}" ]; then
  echo "found ${ARCHIVE_COUNT} backups, removing oldest one(s)"
  find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | sort -r | tail -n +"${BACKUP_COUNT}" | xargs -I {} rm -f {}
fi
</code></pre>
<p>Lastly, edit the system <code class="wiki-source-code" id="source-code-5">crontab</code> with</p>
<p><code><code class="wiki-source-code" id="source-code-6">crontab -e</code></code></p>
<p>and add the following line to have a backup taken every 8 hours:</p>
<p><code><code class="wiki-source-code" id="source-code-7">0 */8 * * * /home/YOURUSERNAME/scripts/bisq1backup &gt; /tmp/bisq1backup.log</code></code></p>
<span class="wiki-legacy-anchor" id="Windows" aria-hidden="true"></span><h3 id="windows"> Windows </h3>
<p>Create a scripts solder and a PowerShell script:</p>
<ul>
<li>Open File Explorer and navigate to your user directory (e.g. C:\Users\YOURUSERNAME).</li>
<li>Create a folder named <code class="wiki-source-code" id="source-code-8">scripts</code>.</li>
<li>Inside this folder, create a new file named <code class="wiki-source-code" id="source-code-9">bisq1backup.ps1</code>.</li>
</ul>
<p>Right-click the script file and open it in Notepad, then paste and edit the following code.</p>
<pre><code class="wiki-source-code" id="source-code-10">
# ==== EDIT THE FOLLOWING ====
$SOURCE_DIR = "C:\Users\YOURUSERNAME\AppData\Roaming\Bisq\btc_mainnet"
$TARGET_FOLDER = "D:\BACKUPS\BISQ1"
$BACKUP_COUNT = 4
# ============================
&#10;$ARCHIVE_ROOT = "bisq1_backup_"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$BACKUP_FILE = "$ARCHIVE_ROOT$timestamp.7z"
$ARCHIVE_PATH = Join-Path $TARGET_FOLDER $BACKUP_FILE
&#10;$SELECTED_FILES = @(
    "BsqSwapTrades",
    "BallotList",
    "DisputeList",
    "RefundDisputeList",
    "SequenceNumberMap",
    "MyVoteList",
    "OpenOffers",
    "MyBlindVoteList",
    "ClosedTrades",
    "MediationDisputeList",
    "MyProposalList",
    "MailboxMessageList",
    "AccountAgeWitnessStore",
    "PendingTrades",
    "MyProofOfBurnList",
    "PreferencesPayload",
    "UserPayload",
    "AddressEntryList",
    "FailedTrades",
    "MyReputationList",
    "TempProposalStore",
    "NavigationPath",
    "UnconfirmedBsqChangeOutputList",
    "IgnoredMailboxMap",
    "PeerList",
    "RemovedPayloadsMap",
    "TradeStatistics3Store",
    "SignedWitnessStore"
)
&#10;$FOLDER_KEYS = "keys"
$FOLDER_WALLET = "wallet"
$FOLDER_TOR = "tor\hiddenservice"
&#10;$FILE_LIST = [System.IO.Path]::GetTempFileName()
&#10;$SUBFOLDER_DB_PATH = Join-Path $SOURCE_DIR "db"
foreach ($file in $SELECTED_FILES) {
    $path = Join-Path $SUBFOLDER_DB_PATH $file
    if (Test-Path $path -PathType Leaf) {
        Add-Content -Path $FILE_LIST -Value $path
    }
}
&#10;foreach ($subfolder in @($FOLDER_KEYS, $FOLDER_WALLET)) {
    $dir = Join-Path $SOURCE_DIR $subfolder
    if (Test-Path $dir) {
        Get-ChildItem -Path $dir -File | ForEach-Object {
            Add-Content -Path $FILE_LIST -Value $_.FullName
        }
    }
}
&#10;$FOLDER_TOR_PATH = Join-Path $SOURCE_DIR $FOLDER_TOR
if (Test-Path $FOLDER_TOR_PATH -PathType Container) {
    Get-ChildItem -Path $FOLDER_TOR_PATH -File -Recurse | ForEach-Object {
        Add-Content -Path $FILE_LIST -Value $_.FullName
    }
}
&#10;&amp; "C:\Program Files\7-Zip\7z.exe" a -t7z -mx=9 -m0=lzma2 -mmt=on -spf $ARCHIVE_PATH @"$FILE_LIST"
&#10;Remove-Item $FILE_LIST
&#10;Write-Output "Backup completed: $BACKUP_FILE"
&#10;$backupFiles = Get-ChildItem -Path $TARGET_FOLDER -Filter "$ARCHIVE_ROOT*.7z" | Sort-Object LastWriteTime -Descending
if ($backupFiles.Count -gt $BACKUP_COUNT) {
    Write-Output "Found $($backupFiles.Count) backups, removing oldest one(s)"
    $backupFiles | Select-Object -Skip $BACKUP_COUNT | ForEach-Object {
        Remove-Item $_.FullName -Force
    }
}
</code></pre>
<p>To run the script every 8 hours:</p>
<ul>
<li>Open Task Scheduler.</li>
<li>Create a new task and give it a name (for example, "bisq1backup").</li>
<li>In the Triggers tab, set a new trigger to begin the task on a schedule, repeating every 8 hours.</li>
<li>In the Actions tab, add a new action:
<ul>
<li>Program/script: powershell.exe</li>
<li>Add arguments: -ExecutionPolicy Bypass -File "C:\Users\YOURUSERNAME\scripts\bisq1backup.ps1"</li>
</ul></li>
<li>Adjust settings as needed and save the task.</li>
</ul>
<span class="wiki-legacy-anchor" id="MacOS" aria-hidden="true"></span><h3 id="macos"> MacOS </h3>
<p>Open the Terminal and run:</p>
<pre><code class="wiki-source-code" id="source-code-11">
cd ~
mkdir -p scripts
cd scripts
touch bisq1backup
chmod +x bisq1backup
nano bisq1backup
</code></pre>
<p>Paste the following code and edit where needed:</p>
<pre><code class="wiki-source-code" id="source-code-12">
#!/bin/bash
&#10;# ==== EDIT THE FOLLOWING ====
SOURCE_DIR="/Users/YOURUSERNAME/Library/Application Support/Bisq/btc_mainnet"
TARGET_FOLDER="/Volumes/BACKUPS/BISQ1"
BACKUP_COUNT=4
# ============================
&#10;ARCHIVE_ROOT="bisq1_backup_"
BACKUP_FILE="${ARCHIVE_ROOT}$(date +%Y%m%d_%H%M%S).7z"
ARCHIVE_PATH="${TARGET_FOLDER}/${BACKUP_FILE}"
SELECTED_FILES=(
  "BsqSwapTrades"
  "BallotList"
  "DisputeList"
  "RefundDisputeList"
  "SequenceNumberMap"
  "MyVoteList"
  "OpenOffers"
  "MyBlindVoteList"
  "ClosedTrades"
  "MediationDisputeList"
  "MyProposalList"
  "MailboxMessageList"
  "AccountAgeWitnessStore"
  "PendingTrades"
  "MyProofOfBurnList"
  "PreferencesPayload"
  "UserPayload"
  "AddressEntryList"
  "FailedTrades"
  "MyReputationList"
  "TempProposalStore"
  "NavigationPath"
  "UnconfirmedBsqChangeOutputList"
  "IgnoredMailboxMap"
  "PeerList"
  "RemovedPayloadsMap"
  "TradeStatistics3Store"
  "SignedWitnessStore"
)
&#10;FOLDER_KEYS="keys"
FOLDER_WALLET="wallet"
FOLDER_TOR="tor/hiddenservice"
&#10;FILE_LIST=$(mktemp)
&#10;SUBFOLDER_DB_PATH="${SOURCE_DIR}/db"
for file in "${SELECTED_FILES[@]}"; do
  if [ -f "${SUBFOLDER_DB_PATH}/$file" ]; then
    echo "${SUBFOLDER_DB_PATH}/$file" &gt;&gt; "${FILE_LIST}"
  fi
done
&#10;for subfolder in "${FOLDER_KEYS}" "${FOLDER_WALLET}"; do
  find "${SOURCE_DIR}/${subfolder}" -maxdepth 1 -type f &gt;&gt; "${FILE_LIST}"
done
&#10;FOLDER_TOR_PATH="${SOURCE_DIR}/${FOLDER_TOR}"
if [ -d "${FOLDER_TOR_PATH}" ]; then
  find "${FOLDER_TOR_PATH}" -type f &gt;&gt; "${FILE_LIST}"
fi
&#10;7z a -t7z -mx=9 -m0=lzma2 -mmt=on -spf "${ARCHIVE_PATH}" @"${FILE_LIST}"
&#10;rm "${FILE_LIST}"
&#10;echo "Backup completed: ${BACKUP_FILE}"
&#10;ARCHIVE_COUNT=$(find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | wc -l)
&#10;if [ "${ARCHIVE_COUNT}" -gt "${BACKUP_COUNT}" ]; then
  echo "Found ${ARCHIVE_COUNT} backups, removing oldest one(s)"
  find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | sort -r | tail -n +"${BACKUP_COUNT}" | xargs -I {} rm -f {}
fi
</code></pre>
<p>To run the backup every 8 hours, edit your crontab using</p>
<p><code><code class="wiki-source-code" id="source-code-13">crontab -e</code></code></p>
<p>Then add the following line:</p>
<p><code><code class="wiki-source-code" id="source-code-14">0 */8 * * * /Users/YOURUSERNAME/scripts/bisq1backup &gt; /tmp/bisq1backup.log 2&gt;&amp;1</code></code></p>
<span class="wiki-legacy-anchor" id="Bisq2" aria-hidden="true"></span><h2 id="bisq2"> Bisq2 </h2>
<span class="wiki-legacy-anchor" id="Linux_2" aria-hidden="true"></span><h3 id="linux-2"> Linux </h3>
<p>Create a <code class="wiki-source-code" id="source-code-15">scripts</code> folder in your <code class="wiki-source-code" id="source-code-16">home</code> directory, prepare an executable file and open it with an editor:</p>
<pre><code class="wiki-source-code" id="source-code-17">
cd ~
mkdir -p scripts
cd scripts
touch bisq2backup
chmod +x bisq2backup
nano bisq2backup
</code></pre>
<p>paste the following code in the file, and edit where needed:</p>
<pre><code class="wiki-source-code" id="source-code-18">
#!/bin/bash
&#10;# ==== EDIT THE FOLLOWING ====
FOLDER_TO_BACKUP="/home/YOURUSERNAME/.local/share/Bisq2/db"
TARGET_FOLDER="/mnt/BACKUPS/BISQ2"
BACKUP_COUNT=4
# ============================
&#10;ARCHIVE_ROOT="bisq2_backup_"
ARCHIVE_NAME="${ARCHIVE_ROOT}$(date +%Y%m%d_%H%M%S).7z"
ARCHIVE_PATH="${TARGET_FOLDER}/${ARCHIVE_NAME}"
&#10;
7z a -t7z -mx=9 -mfb=64 -md=32m -ms=on -mmt=on "/tmp/${ARCHIVE_NAME}" "${FOLDER_TO_BACKUP}/private" "${FOLDER_TO_BACKUP}/settings"
mv "/tmp/${ARCHIVE_NAME}" "${TARGET_FOLDER}"
&#10;ARCHIVE_COUNT=$(find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | wc -l)
&#10;if [ "${ARCHIVE_COUNT}" -gt "${BACKUP_COUNT}" ]; then
  echo "found ${ARCHIVE_COUNT} backups, removing oldest one(s)"
  find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | sort -r | tail -n +"${BACKUP_COUNT}" | xargs -I {} rm -f {}
fi
</code></pre>
<p>Lastly, edit the system <code class="wiki-source-code" id="source-code-19">crontab</code> with</p>
<p><code><code class="wiki-source-code" id="source-code-20">crontab -e</code></code></p>
<p>and add the following line to have a backup taken every 8 hours:</p>
<p><code><code class="wiki-source-code" id="source-code-21">0 */8 * * * /home/YOURUSERNAME/scripts/bisq2backup &gt; /tmp/bisq1backup.log</code></code></p>
<span class="wiki-legacy-anchor" id="Windows_2" aria-hidden="true"></span><h3 id="windows-2"> Windows </h3>
<p>Create a scripts solder and a PowerShell script:</p>
<ul>
<li>Open File Explorer and navigate to your user directory (e.g. C:\Users\YOURUSERNAME).</li>
<li>Create a folder named scripts.</li>
<li>Inside this folder, create a new file named bisq2backup.ps1.</li>
</ul>
<p>Right-click the script file and open it in Notepad, then paste and edit the following code.</p>
<pre><code class="wiki-source-code" id="source-code-22">
# ==== EDIT THE FOLLOWING ====
$FolderToBackup = "C:\Users\YOURUSERNAME\AppData\Roaming\Bisq2\db"
$TargetFolder   = "D:\BACKUPS\BISQ2"
$BackupCount    = 4
# ============================
&#10;$ArchiveRoot = "bisq2_backup_"
$Timestamp   = Get-Date -Format "yyyyMMdd_HHmmss"
$ArchiveName = "$ArchiveRoot$Timestamp.7z"
$TempArchive = Join-Path $env:TEMP $ArchiveName
$FinalArchive = Join-Path $TargetFolder $ArchiveName
&#10;&amp; "C:\Program Files\7-Zip\7z.exe" a -t7z -mx=9 -mfb=64 -md=32m -ms=on -mmt=on "`"$TempArchive`"" "`"$FolderToBackup\private`"" "`"$FolderToBackup\settings`""
&#10;Move-Item -Path $TempArchive -Destination $FinalArchive -Force
&#10;$Archives = Get-ChildItem -Path $TargetFolder -Filter "$ArchiveRoot*.7z" | Sort-Object LastWriteTime -Descending
&#10;if ($Archives.Count -gt $BackupCount) {
    Write-Output "Found $($Archives.Count) backups, removing oldest one(s)"
    $Archives | Select-Object -Skip $BackupCount | ForEach-Object {
        Remove-Item $_.FullName -Force
    }
}
</code></pre>
<p>To run the script every 8 hours:</p>
<ul>
<li>Open Task Scheduler.</li>
<li>Create a new task and give it a name (for example, "bisq2backup").</li>
<li>In the Triggers tab, set a new trigger to begin the task on a schedule, repeating every 8 hours.</li>
<li>In the Actions tab, add a new action:
<ul>
<li>Program/script: powershell.exe</li>
<li>Add arguments: -ExecutionPolicy Bypass -File "C:\Users\YOURUSERNAME\scripts\bisq2backup.ps1"</li>
</ul></li>
<li>Adjust settings as needed and save the task.</li>
</ul>
<span class="wiki-legacy-anchor" id="MacOS_2" aria-hidden="true"></span><h3 id="macos-2"> MacOS </h3>
<p>Open the Terminal and run:</p>
<pre><code class="wiki-source-code" id="source-code-23">
cd ~
mkdir -p scripts
cd scripts
touch bisq2backup
chmod +x bisq2backup
nano bisq2backup
</code></pre>
<p>Paste the following code and edit where needed:</p>
<pre><code class="wiki-source-code" id="source-code-24">
#!/bin/bash
&#10;# ==== EDIT THE FOLLOWING ====
FOLDER_TO_BACKUP="/Users/YOURUSERNAME/Library/Application Support/Bisq2/db"
TARGET_FOLDER="/Volumes/BACKUPS/BISQ2"
BACKUP_COUNT=4
# ============================
&#10;ARCHIVE_ROOT="bisq2_backup_"
ARCHIVE_NAME="${ARCHIVE_ROOT}$(date +%Y%m%d_%H%M%S).7z"
ARCHIVE_PATH="${TARGET_FOLDER}/${ARCHIVE_NAME}"
&#10;7z a -t7z -mx=9 -mfb=64 -md=32m -ms=on -mmt=on "/tmp/${ARCHIVE_NAME}" "${FOLDER_TO_BACKUP}/private" "${FOLDER_TO_BACKUP}/settings"
mv "/tmp/${ARCHIVE_NAME}" "${ARCHIVE_PATH}"
&#10;ARCHIVE_COUNT=$(find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | wc -l)
&#10;if [ "${ARCHIVE_COUNT}" -gt "${BACKUP_COUNT}" ]; then
  echo "Found ${ARCHIVE_COUNT} backups, removing oldest one(s)"
  find "${TARGET_FOLDER}" -maxdepth 1 -type f -name "${ARCHIVE_ROOT}*.7z" | sort -r | tail -n +"${BACKUP_COUNT}" | xargs -I {} rm -f {}
fi
</code></pre>
<p>To run the backup every 8 hours, edit your crontab using:</p>
<p><code><code class="wiki-source-code" id="source-code-25">crontab -e</code></code></p>
<p>Then add the following line:</p>
<p><code><code class="wiki-source-code" id="source-code-26">0 */8 * * * /Users/YOURUSERNAME/scripts/bisq2backup &gt; /tmp/bisq2backup.log 2&gt;&amp;1</code></code></p>
</div>
