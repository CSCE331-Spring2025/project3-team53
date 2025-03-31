CDIR=client/
SDIR=server/
N=npm
INS=install

dependencies:
	($CDIR) $N ($INS) react-router-dom
	($SDIR) ($N ($INS) cors dotenv express pg)
	$N ($INS) npm-run-all

run:
	$N start