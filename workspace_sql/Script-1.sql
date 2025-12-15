SELECT * FROM emp;

SELECT EMPNO, ENAME, DEPTNO FROM emp;

SELECT DISTINCT DEPTNO
	FROM EMP;

select DISTINCT JOB, DEPTNO
	FROM emp;

SELECT ALL JOB, DEPTNO
	FROM emp;

SELECT ENAME, SAL, SAL*12+COMM, COMM
	FROM emp;

SELECT ENAME, SAL, SAL*12+COMM AS ANNSAL, COMM
	FROM emp;

SELECT
	sal,
	ename,
	123,
	'문사eng123'
FROM emp;



WHERE
	deptno IN (10,20);

SELECT * FROM EMP
WHERE
	deptno = 10;

SELECT * FROM emp WHERE deptno = 20;

SELECT * FROM EMP
WHERE
	deptno IN (10,20);


SELECT * FROM EMP WHERE deptno = 10
UNION
SELECT * FROM EMP WHERE deptno = 20;


select empno, ename, sal, deptno
	FROM emp
	WHERE deptno = 10
UNION
SELECT sal, job, deptno, sal
	FROM emp
	WHERE deptno = 20;

SELECT empno, ename, sal, deptno
	FROM EMP
	WHERE deptno = 10
UNION all
SELECT empno, ename, sal, deptno
	FROM emp
	WHERE deptno = 10;

SELECT empno, ename, sal, deptno
	FROM EMP
	WHERE deptno = 10
UNION
SELECT empno, ename, sal, deptno
	FROM EMP
	WHERE deptno = 10;


SELECT EMPNO, ENAME, SAL, DEPTNO
	FROM EMP
	WHERE DEPTNO = 10
UNION
SELECT SAL, JOB, DEPTNO, SAL
	FROM EMP
	WHERE DEPTNO = 20;
	
	
SELECT EMPNO, ENAME, SAL, DEPTNO
	FROM EMP
	ORDER BY EMPNO, SAL desc;

-- 130p
-- 1번
SELECT * FROM EMP
WHERE ename LIKE '%S'
ORDER BY empno;

-- 2번
SELECT empno, ename, job, sal, deptno FROM EMP
WHERE deptno = 30
	AND job = 'SALESMAN'
ORDER BY empno;

-- 3번
SELECT empno, ename, job, sal, deptno FROM EMP
WHERE
	deptno IN (20,30) AND sal >2000
ORDER BY empno;

SELECT empno, ename, job, sal, deptno FROM EMP
WHERE
	deptno = 20 AND sal > 2000
UNION all
SELECT empno, ename, job, sal, deptno FROM EMP
WHERE
	deptno = 30 AND sal > 2000;

-- 4번
SELECT * FROM emp
WHERE not (sal >= 2000 and sal <= 3000)
ORDER BY empno;

SELECT * FROM emp
WHERE sal NOT BETWEEN 2000 AND 3000
ORDER BY empno;

-- 5번
SELECT ename, empno, sal, deptno FROM emp
WHERE
	ename LIKE '%E%'
	AND deptno = 30
	AND sal NOT BETWEEN 1000 AND 2000
ORDER BY ename;

-- 6번
SELECT * FROM EMP
WHERE
	comm IS NULL
	AND mgr IS NOT NULL
	AND job IN ('MANAGER', 'CLERK')
	AND ename NOT LIKE '_L%';

SELECT * FROM EMP
WHERE
	comm IS NULL
	AND mgr IS NOT NULL
	AND (job = 'MANAGER' OR job = 'CLERK')
	-- or로 처리할 시 괄호 사용 필수
	AND ename NOT LIKE '_L%';


-- 97p
-- 2번
SELECT distinct job FROM emp;

-- 3번
SELECT empno employee_no, ename employee_name, mgr manager, sal salary, comm commision, deptno department_no
FROM emp
ORDER BY deptno DESC, ename;
