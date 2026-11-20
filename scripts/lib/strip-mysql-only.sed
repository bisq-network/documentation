# Statements that MySQL writes into a dump, that MariaDB rejects, and that hold no wiki data.
# Used by scripts/sql-dump-to-xml.sh on the stream it restores; scripts/backup-safety.test.mjs tests it.
#
# GTID_PURGED: replication bookkeeping in dumps from MySQL 5.6 and later. MariaDB stops at it with
# "Unknown system variable 'GTID_PURGED'". MySQL 5.7 writes it on one line; MySQL 8 may spread its
# value over several, which are removed from the first line to the one that ends the statement. The
# one-line form needs its own rule: a range would only look for its end from the next line on.
/^SET @@GLOBAL\.GTID_PURGED.*;[[:space:]]*$/d
/^SET @@GLOBAL\.GTID_PURGED/,/;[[:space:]]*$/d
