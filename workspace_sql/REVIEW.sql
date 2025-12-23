SELECT 	empno, ename, mgr,
	CASE
		WHEN mgr IS NULL THEN '0000'
		WHEN substr(mgr,1,2)='75' THEN '5555'
		WHEN substr(mgr,1,2)='76' THEN '6666'
		WHEN substr(mgr,1,2)='77' THEN '7777'
		WHEN substr(mgr,1,2)='78' THEN '8888'
		ELSE to_char(mgr)
	END AS chg_mgr
FROM emp;
	
SELECT ename.
	replace(ename, substr(ename,1,2), '****') rp,
	concat(substr(ename,1,2),'****') cc,
	rpad(substr(ename,1,2),6,'*') rp
FROM emp;

SELECT ename,
	rpad(substr(ename,1,2), length(ename),'*') masking
FROM emp;

SELECT ename,
	lpad(substr(ename,3), length(ename),'*') lp,
	concat('**', substr(ename,3)) cc,
	replace(ename, substr(ename,1,2),'**') re
FROM emp;

SELECT empno, ename, sal,
	trunc(sal/21.5, 2) day_pay,
	round(sal/21.5/8, 1) time_pay
FROM emp;

SELECT empno, ename,
	to_char(hiredate, 'YY/MM/DD') hiredate,
	TO_char(add_months(hiredate,3), 'YYYY-MM-DD') R_JOB,
	nvl(to_char(comm), 'N/A') comm
FROM emp;

SELECT deptno,
	round(avg(sal)) avg,
	round(max(sal)) max,
	round(min(sal)) min,
	count(sal) cnt
FROM emp
GROUP BY deptno
ORDER BY min;

SELECT job,
	count(ename) cnt
FROM emp
GROUP BY job
HAVING count(ename) >= 3
ORDER BY cnt DESC;


SELECT ename, empno, mgr,
	CASE
		WHEN mgr IS NULL then '0000'
		WHEN rpad(mgr,2)=75 THEN '5555'
		WHEN rpad(mgr,2)=76 THEN '6666'
		WHEN rpad(mgr,2)=77 THEN '7777'
		WHEN rpad(mgr,2)=78 THEN '8888'
		ELSE to_char(mgr)
	END AS chg_mgr
FROM emp;
	
SELECT deptno,
	round(avg(sal)) avg,
	round(max(sal)) max,
	round(min(sal)) min,
	count(ename) cnt
FROM emp
GROUP BY deptno
ORDER BY min;


SELECT job,
	count(ename) cnt
FROM emp
GROUP BY job
HAVING count(ename)>=3
ORDER BY cnt DESC;

SELECT empno, ename,
	rpad(substr(ename,1,2), length(ename), '*') AS masking
FROM emp;

SELECT empno, ename,
	lpad(substr(ename,3), length(ename), '*') lpad,
	concat('**', substr(ename,3)) concat
FROM emp;

SELECT empno, ename, job, deptno
FROM emp
WHERE ename LIKE '%E%';

SELECT empno, ename, job, sal AS orgin,
	CASE job
		when 'MANAGER' THEN sal*1.5
		ELSE sal
		END sal
FROM emp
WHERE job IN ('MANAGER', 'CLERK');