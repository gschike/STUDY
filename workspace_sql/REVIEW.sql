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



------------------

-- 273
-- 0
CREATE TABLE emp10
AS SELECT * FROM emp;
CREATE TABLE dept10
AS SELECT * FROM dept;
CREATE TABLE salgrade10
AS SELECT * FROM salgrade;

-- 1
INSERT into dept10
VALUES (50, 'ORACLE', 'BUSAN');
INSERT into dept10
VALUES (60, 'SQL', 'ILSAN');
INSERT into dept10
VALUES (70, 'SELECT', 'INCHEON');
INSERT INTO dept10
VALUES (80, 'DML', 'BUNDANG');

SELECT * FROM DEPT10;

-- 2
INSERT INTO EMP10
VALUES (7201, 'TEST_USER1', 'MANAGER', 7788, TO_DATE('2016-01-02', 'YYYY-MM-DD'), 4500, NULL, 50);

INSERT INTO EMP10
VALUES (7203, 'TEST_USER3', 'ANALYST', 7201, TO_DATE('2016-04-11', 'YYYY-MM-DD'), 3400, NULL, 60);

INSERT INTO EMP10
VALUES (7204, 'TEST_USER4', 'SALESMAN', 7201, TO_DATE('2016-05-31', 'YYYY-MM-DD'), 2700, 300, 60);

INSERT INTO EMP10
VALUES (7205, 'TEST_USER5', 'CLERK', 7201, TO_DATE('2016-07-20', 'YYYY-MM-DD'), 2600, NULL, 70);

SELECT * FROM EMP10;

-- 3
SELECT *
FROM EMP10
WHERE SAL >= (SELECT AVG(SAL) FROM EMP10 WHERE DEPTNO=50 GROUP BY DEPTNO);

UPDATE EMP10
SET DEPTNO = '70'
WHERE SAL >= (SELECT AVG(SAL) FROM EMP10 WHERE DEPTNO=50 GROUP BY DEPTNO);

SELECT * FROM EMP10;

-- 4
UPDATE EMP10
SET SAL = SAL*1.1,
	DEPTNO = 80
WHERE HIREDATE > (SELECT MIN(HIREDATE) FROM EMP10 WHERE DEPTNO=60);

SELECT * FROM EMP10 WHERE DEPTNO = 80;


-- 5
DELETE FROM EMP10
WHERE SAL <= (SELECT HISAL FROM SALGRADE WHERE GRADE = 5) AND SAL >= (SELECT LOSAL FROM SALGRADE WHERE GRADE=5);

SELECT * FROM EMP10 E LEFT OUTER JOIN SALGRADE S ON E.SAL <= S.HISAL AND E.SAL >= S.LOSAL ORDER BY  S.GRADE;



-- 311
-- 1
CREATE TABLE EMP_HW (
	EMPNO NUMBER(4),
	ENAME VARCHAR2(10),
	JOB VARCHAR2 (9),
	MGR NUMBER(4),
	HIREDATE DATE,
	SAL NUMBER(7,2),
	COMM NUMBER (7,2),
	DEPTNO NUMBER(2)
);

SELECT * FROM EMP_HW;

-- 2
ALTER TABLE EMP_HW
ADD BIGO VARCHAR2(20);

SELECT * FROM EMP_HW;

-- 3
ALTER TABLE EMP_HW
MODIFY EMPNO VARCHAR2(30);

SELECT * FROM EMP_HW;

--- 4
ALTER TABLE EMP_HW
RENAME COLUMN BIGO TO REMARK;

SELECT * FROM EMP_HW;



----------------
----- 한기대 -----
----------------

CREATE TABLE 학과 (
	학과코드 number(5) PRIMARY KEY,
	학과명 varchar2(20)
);

SELECT * FROM 학과;

INSERT INTO 학과
VALUES (10000, '컴퓨터공학과');

CREATE TABLE 학생 (
	학번 number(5) PRIMARY KEY,
	성명 varchar2(20) NOT NULL,
	입학일자 DATE NOT null,
	졸업일자 DATE,
	상태 varchar2(20),
	학과코드 number(5) REFERENCES 학과(학과코드)
);

SELECT * FROM 학생;

INSERT INTO 학생
VALUES (12345, '홍길동', to_date('2020-03-02', 'yyyy-mm-dd'), NULL, NULL, 10000);

CREATE TABLE 교수 (
	교수번호 number(5) PRIMARY KEY,
	교수명 varchar2(20) NOT NULL,
	학과코드 number(5) REFERENCES 학과(학과코드)
);

SELECT * FROM 교수;

INSERT INTO 교수
VALUES (54321, '이순신', 10000);
INSERT INTO 교수
VALUES (54322, '홍길동', 10000);


CREATE TABLE 과목 (
	과목코드 number(5) PRIMARY KEY,
	과목명 varchar2(20)
);

SELECT * FROM 과목;

INSERT INTO 과목
VALUES (33333, null);

CREATE TABLE 이수과목 (
	과목코드 number(5) REFERENCES 과목(과목코드),
	학과코드 number(5) REFERENCES 학과(학과코드),
	필수여부 CHAR(1) DEFAULT 'N' NOT NULL,
	이수학점 number(1) DEFAULT '3'
);

ALTER TABLE 이수과목
ADD PRIMARY KEY (과목코드, 학과코드);

SELECT * FROM 이수과목;

INSERT INTO 이수과목 (과목코드, 학과코드)
VALUES (33333, 10000);

CREATE TABLE 강좌 (
	강좌번호 number(5),
	학기 number(1),
	강좌명 varchar2(20),
	이수학점 number(1) DEFAULT '3',
	주별시간 number(2),
	과목코드 number(5),
	학과코드 number(5),
	교수번호 number(5) REFERENCES 교수(교수번호),
	PRIMARY KEY (강좌번호, 학기),
	FOREIGN KEY (과목코드, 학과코드) REFERENCES 이수과목(과목코드, 학과코드)
);

SELECT * FROM 강좌;

INSERT INTO 강좌
VALUES (00000, 1, '뭐하지', 3, 3, 33333, 10000, 54321);

CREATE TABLE 수강 (
	학번 number(5) REFERENCES 학생(학번),
	강좌번호 number(5),
	학기 number(1),
	학점코드 number(5),
	학점 number(2,1),
	PRIMARY KEY (학번, 강좌번호, 학기),
	FOREIGN KEY (강좌번호, 학기) REFERENCES 강좌(강좌번호, 학기)
);

DROP TABLE 수강;
DROP TABLE 강좌;
DROP TABLE 이수과목;
DROP TABLE 과목;
DROP TABLE 교수;
DROP TABLE 학생;
DROP TABLE 학과;

SELECT * FROM user_constraints;


----------------
----- 한기대 -----
----------------

-- 1.
SELECT count(수강.학번), avg(수강.학점)
FROM 강좌
	LEFT OUTER JOIN 교수 ON (강좌.교수번호 = 교수.교수번호)
	LEFT OUTER JOIN 수강 ON (강좌.강좌번호 = 수강.강좌번호)
WHERE 교수.교수명 = '홍길동'
	AND (강좌.학기 = '2010-1'
			AND 강좌.강좌명 = '데이터베이스론');

-- 2.
SELECT count(학생.학번)
FROM 학과
	LEFT OUTER JOIN 학생 ON (학과.학과코드 = 학생.학과코드)
WHERE 학과.학과명 = '컴퓨터공학과'
	AND EXTRACT(YEAR FROM 학생.입학일자) BETWEEN EXTRACT(YEAR FROM sysdate)-10 AND EXTRACT(YEAR FROM sysdate);

-- 3.
SELECT 수강.학기, 수강.강좌번호, 강좌.강좌명, 강좌.이수학점, 수강.학점코드, 수강.학점
FROM 학생
	LEFT OUTER JOIN 수강 ON (학생.학번 = 수강.학번)
	LEFT OUTER JOIN 강좌 ON (수강.강좌번호 = 강좌.강좌번호 AND 수강.학기 = 강좌.학기)
WHERE 학생.학번 = '12345';

-- 4.
SELECT
FROM 




------------------

SELECT rpad(substr(empno, 1, 2), length(empno), '*') empno, e.ename, e.deptno, d.dname
FROM emp e LEFT OUTER JOIN dept d ON e.deptno = d.deptno;