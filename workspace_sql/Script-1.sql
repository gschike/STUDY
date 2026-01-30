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
	'문자eng123',
	deptno
FROM emp
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


/* 함수 */
-- UPPER, LOWER, INITCAP
SELECT ename, upper(ename), lower(ename), initcap(ename)
FROM emp;

SELECT * FROM EMP
WHERE upper(ename)=upper('scott');

SELECT 1 FROM dual;

SELECT upper('aBc') FROM dual;
SELECT initcap('i am sleepy') FROM dual;
SELECT upper('abc'), upper(123), lower(upper('abc')) FROM dual;

SELECT * FROM emp
WHERE ename LIKE '%AM%';

SELECT * FROM emp
WHERE lower(ename) LIKE lower('%aM%');
-- lower: 전부 소문자로

-- LENGTH
SELECT ename, length(ename) Name_LENGTH
FROM emp
WHERE LENGTH(ename) >= 5;

SELECT LENGTH('한글'), LENGTHB('한글')
FROM DUAL;

SELECT LENGTH('A'), LENGTH('가'), LENGTHB('A'), LENGTHB('가') FROM DUAL;


-- SUBSTR
SELECT JOB, SUBSTR(JOB, 1, 2), SUBSTR(JOB, 3, 2), SUBSTR(JOB, -5, 30)
	FROM EMP;

SELECT ENAME, SUBSTR(ENAME, 2, -3) FROM EMP; -- 추출 길이가 0이나 음수이면 NULL 발생
SELECT ENAME, SUBSTR(ENAME, 2, 30) FROM EMP; -- 추출 길이가 크면 끝까지 출력, NULL 및 오류 발생 x
SELECT ENAME, SUBSTR(ENAME, 20, 3) FROM EMP; -- 실제 길이보다 시작 위치가 크면 NULL 발생

SELECT JOB,
	SUBSTR(JOB, -LENGTH(JOB)),
	SUBSTR(JOB, -LENGTH(JOB), 2),
	SUBSTR(JOB, -3)
FROM EMP;

SELECT ENAME, SUBSTR(ENAME, -3, 2) FROM EMP; -- 음수는 뒤에서부터 오른쪽 방향으로 추출

-- IF) -를 지원하지 않는 경우, 뒤에서부터 카운트를 하고 싶으면 LENGTH 활용
SELECT ENAME, SUBSTR(ENAME, LENGTH(ENAME)-2, 2) FROM EMP;
	-- 뒤에서부터 3번째 글자부터 추출, LENGTH(ENAME)-2

SELECT ENAME, SUBSTR(ENAME, LENGTH(ENAME)-20, 2) FROM EMP;
	-- 시작 위치가 전체 길이보다 큼 > NULL 발생

-- INSTR(문자열, 확인할 글자, 시작 위치) > 몇번째에 위치
SELECT INSTR('HELLO, ORACLE', 'L', 5) FROM DUAL;
SELECT INSTR('HELLO, ORACLE', 'Z', 5) FROM DUAL; -- 존재하지 않는 글자는 0 나옴


-- REPLACE(문자열, 대상, 바꿀 글씨)
SELECT 'A-B-C' BEFORE,
	REPLACE('A-B-C', '-', ' ') ONE,
	REPLACE('A-B-C', '-') TWO -- 바꿀 글씨를 비워두면 그냥 생략함
FROM DUAL;

SELECT ENAME, REPLACE(ENAME, 'A', 'abc') replace_name
FROM emp
WHERE ENAME LIKE '%A%';


-- LPAD/RPAD(대상, 전체 자릿수, 채울 글씨) / 채울 글씨를 비우면 공백으로 처리
SELECT LPAD(RPAD('ORACLE', 10, '*'), 15, '#') FROM DUAL;

SELECT ENAME, 
	LPAD(ENAME, 10, '#') LP,
	LPAD(ENAME, 5, '#') FIVE -- 대상의 글자수가 전체 자릿수보다 크면, 전체 자릿수만큼 잘림
FROM EMP;
/* LPAD, RPAD는
 * 모자르면 채우고, 넘치면 자름
 * 즉, 두번째 값의 길이로 만들어줌 */

-- 문제1
	-- ENAME에서 앞글자 두글자만 출력
	-- SUBSTR, REPLACE, LPAD 모두 활용해보기
-- SUBSTR
SELECT ENAME, SUBSTR(ENAME, 1, 2) SUB,
-- REPLACE
	REPLACE(ENAME, SUBSTR(ENAME, 3), '') REP,
-- LPAD/RPAD -> 동일한 결과
	LPAD(ENAME, 2) LP,
	RPAD(ENAME, 2) RP
FROM EMP;

-- 문제2
	-- ENAME의 앞 두글자만 원본을 출력하고 나머지는 4개의 *로 표시
SELECT ENAME, REPLACE(ENAME, SUBSTR(ENAME,3), '****') REP,
	-- ENAME에서 3번째 글자부터 ****로 대체
	RPAD(SUBSTR(ENAME,1,2), 6, '*') RP,
	-- ENAME에서 앞 두글자 추출, 4개의 *을 첨부하여 총 6글자
	CONCAT(SUBSTR(ENAME,1,2), '****') CON
	-- ENAME에서 앞 두글자 추출, ****와 병합
FROM EMP;

-- 문제3
	-- ENAME의 앞 두글자만 원본을 출력하고 나머지는 *로 출력, 단 전체 길이는 원래 이름의 길이만큼
SELECT ENAME, RPAD(SUBSTR(ENAME,1,2), LENGTH(ENAME), '*') MASKING FROM EMP;
	-- ENAME에서 앞 두글자 추출, 나머지 길이만큼 *로 대체

-- 문제4
	-- ENAME의 앞 두글자만 *로 출력
SELECT LPAD(SUBSTR(ENAME, 3), LENGTH(ENAME), '*') LP FROM EMP;
	-- ENAME에서 3번째 자리부터 추출, 원래 길이만큼 *로 대체
SELECT '**'||SUBSTR(ENAME,3) FROM EMP;


-- CONCAT : 많이 사용하진 않음 -> 대신 || 활용
SELECT 'AB', 'CD', 'AB'||'CD' FROM DUAL;

SELECT EMPNO||' : '||ENAME FROM EMP;

SELECT ENAME||' 님' FROM EMP;

SELECT JOB, ENAME||' 매니저' NAME FROM EMP
WHERE JOB='MANAGER';

SELECT 'I '||'LOVE '||'YOU '||'SO '||'MUCH' FROM DUAL;


-- TRIM
SELECT
	TRIM(BOTH '<' FROM '<_ORACLE_>'),
	LTRIM('<_ORACLE_>', '_<'),
	RTRIM('<_ORACLE_>', '_>')
FROM DUAL;

SELECT
	'['||'  _ _ORACLE_ _  '||']',
	'['||TRIM('  _ _ORACLE_ _  ')||']',
	'['||LTRIM('  _ _ORACLE_ _  ')||']',
	'['||RTRIM('  _ _ORACLE_ _  ')||']'
FROM DUAL;


-- 숫자 함수

SELECT ROUND(14.46), ROUND(14.46, -1), ROUND(14.46, 0), ROUND(14.461, 1) FROM DUAL;
-- 14, 10, 14, 14.5

SELECT TRUNC(14.46), TRUNC(14.46, 1), TRUNC(14.46, -1), TRUNC(-14.46) FROM DUAL;
-- 14, 14.4, 10, -14

SELECT CEIL(3.14), FLOOR(3.56), TRUNC(3.14) FROM DUAL;
-- 4, 3, 3

SELECT CEIL(-3.14), FLOOR(-3.14), TRUNC(-3.14) FROM DUAL;
-- -3, -4, -3

SELECT MOD(15,6),
	MOD(10,2),
	MOD(1,2)
FROM DUAL;

SELECT 15/6 FROM DUAL;

--몫
SELECT TRUNC(15/6) FROM DUAL;

SELECT MOD(15/6), MOD(15/0) FROM DUAL;
SELECT MOD(15/0) FROM DUAL;

SELECT MOD(6,3), MOD(7,3), MOD(8,3), MOD(9,3) FROM DUAL;

-- 날짜 함수
SELECT SYSDATE FROM DUAL; -- 선생님 오라클을 사용하는데, 선생님 오라클이 영국 시간으로 기준되어 있어서 시간은 9시간 느리게 나옴
SELECT SYSDATE+20 FROM DUAL;

SELECT TO_DATE(20251216)+0.5,
	TO_NUMBER(20251216)+20
FROM DUAL;

SELECT NEXT_DAY(TO_DATE(20251216), '토요일')
FROM DUAL;

-- 자료형 변환 함수
SELECT TO_CHAR(SYSDATE+9/24, 'YYYY"년" MM"월" DD"일" HH24"시" MI"분" SS"초"') FROM DUAL;

SELECT TO_CHAR(SYSDATE+9/24, 'YYYY년 MM월 DD일 HH24시 MI분 SS초') FROM DUAL;
-- 한글 리터럴 처리가 안 되어 있어서 오류 발생

SELECT * FROM EMP;

SELECT * FROM EMP
WHERE HIREDATE > TO_DATE('1981/06/01', 'YYYY/MM/DD')
ORDER BY SAL DESC;


-- NVL
SELECT EMPNO, ENAME, SAL, COMM, SAL+COMM, 
	NVL(COMM, 0),
	SAL+NVL(COMM, 0)
FROM EMP;

SELECT SAL, COMM, NVL(COMM, 0), SAL+NVL(COMM,0), SAL+COMM
FROM EMP;

-- 조건함수
-- DECODE
SELECT JOB, SAL,
	DECODE(JOB,
	'MANAGER', SAL*1.1,
	'SALESMAN', SAL*1.05,
	'ANALYST', SAL,
	SAL*1.03) AS UASAL
FROM EMP;

-- CASE
SELECT JOB, SAL,
	CASE JOB
		WHEN 'MANAGER' THEN SAL*1.1
		WHEN 'SALESMAN' THEN SAL*1.05
		WHEN 'ANALYST' THEN SAL
		ELSE SAL*1.03
	END AS UPSAL
FROM EMP;

SELECT EMPNO, ENAME, COMM,
	CASE
		WHEN COMM IS NULL THEN '해당 사항 없음'
		WHEN COMM = 0 THEN '수당 없음'
		WHEN COMM > 0 THEN '수당 : '||COMM
	END AS COMM_TEXT
FROM EMP;

SELECT ENAME,
	CASE
		WHEN LENGTH(ENAME)>=6 THEN SUBSTR(ENAME, 1, 5)
		WHEN LENGTH(ENAME)<5 THEN RPAD(ENAME, 5, '*')
		ELSE ENAME
	END AS NAME
FROM EMP;
	

-- 179
-- Q1
SELECT EMPNO,
	RPAD(SUBSTR(EMPNO,1,2), LENGTH(EMPNO), '*') MASKING_EMPNO,
	ENAME,
	RPAD(SUBSTR(ENAME,1,1), 5, '*') MASKING_ENAME
FROM EMP
WHERE LENGTH(ENAME)>=5 AND LENGTH(ENAME)<6;

-- Q2
SELECT EMPNO, ENAME, SAL,
	TRUNC(SAL/21.5,2) DAY_PAY,
	ROUND(SAL/21.5/8,1) TIME_PAY
FROM EMP;

-- Q3
SELECT EMPNO, ENAME, TO_CHAR(HIREDATE, 'YY/MM/DD') HIREDATE,
	TO_CHAR(ADD_MONTHS(HIREDATE, 3), 'YYYY-MM-DD') R_JOB,
	NVL(TO_CHAR(COMM), 'N/A') COMM
FROM EMP;

-- Q4
SELECT EMPNO, ENAME, MGR,
	CASE
		WHEN TO_CHAR(MGR) IS NULL THEN '0000'
		WHEN SUBSTR(MGR,1,2)='75' THEN '5555'
		WHEN SUBSTR(MGR,1,2)='76' THEN '6666'
		WHEN SUBSTR(MGR,1,2)='77' THEN '7777'
		WHEN SUBSTR(MGR,1,2)='78' THEN '8888'
		ELSE TO_CHAR(MGR)
	END AS CHG_MGR
FROM EMP;

-- Q2
SELECT EMPNO, ENAME, SAL,
	TRUNC(SAL/21.5, 2),
	ROUND(SAL/21.5/8, 1)
FROM EMP;

-- Q3
SELECT EMPNO, ENAME,
	TO_CHAR(HIREDATE, 'YY/MM/DD') HIREDATE,
	TO_CHAR(ADD_MONTHS(HIREDATE, 3), 'YYYY-MM-DD') R_JOB,
	NVL(TO_CHAR(COMM), 'N/A')
FROM EMP;

-- Q4
-- CASE 활용
SELECT EMPNO, ENAME, MGR,
	CASE
		WHEN TO_CHAR(MGR) IS NULL THEN '0000'
		WHEN SUBSTR(MGR,1,2)='75' THEN '5555'
		WHEN SUBSTR(MGR,1,2)='76' THEN '6666'
		WHEN SUBSTR(MGR,1,2)='77' THEN '7777'
		WHEN SUBSTR(MGR,1,2)='78' THEN '8888'
		ELSE TO_CHAR(MGR)
	END AS CHG_MGR
FROM EMP;

SELECT EMPNO, ENAME, MGR,
	CASE
		WHEN MGR IS NULL THEN '0000'
		WHEN SUBSTR(MGR,1,2)=75 THEN '5555'
		WHEN SUBSTR(MGR,1,2)=76 THEN '6666'
		WHEN SUBSTR(MGR,1,2)=77 THEN '7777'
		WHEN SUBSTR(MGR,1,2)=78 THEN '8888'
		ELSE TO_CHAR(MGR)
	END AS CHG_MGR
FROM EMP;
-- > 동일 컬럼 내 데이터셋만 같으면 무관. MGR 컬럼은 숫자, CHG_MGR 컬럼은 문자로 변환해도 기능함

-- CASE 활용, ELSE에 NULL 조건
SELECT EMPNO, ENAME, MGR,
	CASE
		WHEN SUBSTR(MGR,1,2)='75' THEN '5555'
		WHEN SUBSTR(MGR,1,2)='76' THEN '6666'
		WHEN SUBSTR(MGR,1,2)='77' THEN '7777'
		WHEN SUBSTR(MGR,1,2)='78' THEN '8888'
	 ELSE
	 	CASE
	 		WHEN MGR IS NULL THEN '0000'
	 		ELSE TO_CHAR(MGR)
	 	END
	END AS CHG_MGR
FROM EMP;

-- CASE 기준 데이터 적용, ELSE에 NULL
SELECT EMPNO, ENAME, MGR,
	CASE SUBSTR(MGR,1,2)
	 WHEN '75' THEN '5555'
	 WHEN '76' THEN '6666'
	 WHEN '77' THEN '7777'
	 WHEN '78' THEN '8888'
	 ELSE
	 	CASE
	 		WHEN MGR IS NULL THEN '0000'
	 		ELSE TO_CHAR(MGR)
	 	END
	END AS CHG_MGR
FROM EMP;



-- CASE 기준데이터 활용, UNION ALL 활용하여 NULL 따로 처리
SELECT EMPNO, ENAME, MGR,
	CASE SUBSTR(MGR,1,2)
	 WHEN '75' THEN '5555'
	 WHEN '76' THEN '6666'
	 WHEN '77' THEN '7777'
	 WHEN '78' THEN '8888'
	 ELSE TO_CHAR(MGR)
	 END AS CHG_MGR
FROM EMP
WHERE MGR IS NOT NULL
UNION ALL
SELECT EMPNO, ENAME, MGR,
	CASE
		WHEN MGR IS NULL THEN '0000'
	END AS CHG_MGR
FROM EMP
WHERE MGR IS NULL;

-- DECODE 활용, UNION ALL 활용하여 NULL 따로 처리
SELECT EMPNO, ENAME, MGR,
	DECODE(SUBSTR(MGR,1,2),
	'75', '5555',
	'76', '6666',
	'77', '7777',
	'78', '8888',
	TO_CHAR(MGR)) AS CHG_MGR
FROM EMP
WHERE MGR IS NOT NULL
UNION ALL
SELECT EMPNO, ENAME, MGR,
	DECODE(MGR, NULL, '0000') AS CHG_MGR
FROM EMP
WHERE MGR IS NULL;
	
SELECT EMPNO, ENAME, MGR,
	CASE 
		WHEN RPAD(MGR,2)='75' THEN '5555'
		WHEN RPAD(MGR,2)='76' THEN '6666'
		WHEN RPAD(MGR,2)='77' THEN '7777'
		WHEN RPAD(MGR,2)='78' THEN '8888'
		ELSE
		CASE
			WHEN MGR IS NULL THEN '0000'
			ELSE TO_CHAR(MGR)
			END
	END
FROM EMP;

-- GPT 쪼아내서 받은 답변. 숫자 타입으로 저장하면서 0000으로 변환하는 건 불가능. 변환 시에 문자 타입으로 변경해야 함.
SELECT EMPNO, ENAME, MGR,
       TO_CHAR(
           CASE 
               WHEN RPAD(MGR,2) = '75' THEN 5555
               WHEN RPAD(MGR,2) = '76' THEN 6666
               WHEN RPAD(MGR,2) = '77' THEN 7777
               WHEN RPAD(MGR,2) = '78' THEN 8888
               WHEN MGR IS NULL THEN 0
               ELSE MGR
           END,
           'FM0000'
       ) AS CHG_MGR
FROM EMP;

SELECT AVG(SAL) AS AVG
FROM EMP
WHERE DEPTNO = 10
	UNION ALL
SELECT AVG(SAL) AS AVG
FROM EMP
WHERE DEPTNO = 20
	UNION ALL
SELECT AVG(SAL) AS AVG
FROM EMP
WHERE DEPTNO = 30;

SELECT AVG(SAL), DEPTNO
	FROM EMP
GROUP BY DEPTNO;

-- 200P
-- Q1
SELECT DEPTNO, ROUND(AVG(SAL),0) AVG, MAX(SAL) MAX, MIN(SAL) MIN, COUNT(ENAME) CNT
FROM EMP
GROUP BY DEPTNO
ORDER BY MIN;

--Q2
SELECT JOB, COUNT(ENAME) CNT
FROM EMP
GROUP BY JOB
HAVING COUNT(ENAME)>=3
ORDER BY CNT DESC;



-- 2026.01.26 ---

SELECT ename, length(ename) FROM emp;
-- length 는 단일행 함수기 때문에 ename과 같은 row 개수 나옴

SELECT SUM(COMM) FROM EMP;
-- NULL은 원래 계산 안 되지만, SUM은 알아서 방어코딩으로 제외하고 해줌

SELECT SUM(DISTINCT SAL), SUM(ALL SAL), SUM(SAL)
FROM EMP;

-- SELECT SUM(SAL), SAL FROM EMP;
-- not a single-group group function
-- ROW 의 개수가 다르기 때문
-- sum 은 다중행 함수기 때문에 row의 개수가 달라서 안 됨


SELECT COUNT(SAL) FROM EMP;
-- 14개

SELECT COUNT(COMM) FROM EMP;
-- 4개
-- **** NULL은 제외하고 카운트 함 ****

SELECT COUNT(*) FROM EMP;
-- 전체 몇 줄 있는지 확인하기 위해서 *를 많이 사용함

SELECT COUNT(*) FROM EMP
WHERE DEPTNO = 30;
-- 6 : 30번 부서가 6명 있음

SELECT
	MAX(SAL), MIN(SAL), min(hiredate), min(comm),
	count(*), sum(sal)
FROM EMP;

SELECT floor(avg(sal)) FROM emp;


-- Q. 이름에 A가 들어가는 사람은 몇 명? (단, 소문자 a로)
SELECT count(ename) FROM emp
WHERE lower(ename) LIKE '%a%';

-- a가 들어가는 사람 리스트
SELECT ename FROM emp
WHERE lower(ename) LIKE lower('%a%');
-- 습관처럼 lower, upper는 양쪽 다 쳐주는 게 좋음


SELECT DISTINCT deptno FROM emp;



-- group by
/*
 * 제약 1. select에는 group by에 적은 컬럼 명만 가능
 * 		ex) deptno 로 group by 해놓고, ename 출력 불가능!
 * 제약 2. select에 집계 함수(다중행 함수)는 가능 (count, avg, sum 등)
 */

SELECT deptno, floor(avg(sal)) avg, count(*) "EMP CNT", sum(sal) total FROM emp
GROUP BY deptno
ORDER BY avg desc;

SELECT job, floor(avg(sal)) avg, count(*) "EMP CNT" FROM emp
GROUP BY job
ORDER BY avg DESC;

SELECT deptno, floor(avg(sal)) avg FROM emp
GROUP BY deptno
HAVING avg(sal)>=2000
ORDER BY avg DESC;

SELECT deptno, job, count(*)
FROM emp
GROUP BY deptno, job
ORDER BY deptno asc;



-- having
/*
 * group by 사용할 때에만 사용 가능
 * group by 의 조건
 */
-- 평균보다 높은 사람? where 에는 집계 함수 사용 불가능 (avg 못 씀)
SELECT ename, empno, sal
FROM emp
WHERE sal >= (SELECT avg(sal) FROM emp);

SELECT avg(sal) -- 2073
FROM emp;

-- 10번 부서 직업만 뽑기
SELECT deptno, job
FROM emp
WHERE deptno = 10
GROUP BY deptno, job;

SELECT deptno, job
FROM emp
GROUP BY deptno, job
HAVING deptno = 10; -- 위에랑 똑같음

SELECT deptno, job, avg(sal) avg
FROM emp
GROUP BY deptno, job
HAVING avg(sal) >= 2000
ORDER BY avg;


-- job 별로 3명 이상인 job과 카운트를 출력
SELECT job, count(*) count
FROM emp
GROUP BY job
HAVING count(*) >= 3
ORDER BY count;


SELECT sum(1)
FROM emp;
-- 14 나옴. count랑 똑같음




-- join --
SELECT * FROM dept;
SELECT * FROM emp;

SELECT *
FROM emp, dept
ORDER BY empno;
-- 한 명당 4줄 씩 나옴
-- 왜냐하면 dept 테이블이 4줄 (10, 20, 30, 40)임

SELECT *
FROM emp e, dept d
WHERE e.deptno = d.deptno
ORDER BY empno;

SELECT deptno
FROM emp
WHERE upper(ename) = upper('smith');

SELECT *
FROM dept
WHERE deptno = 20;

-- 별칭 주는 순간 별칭밖에 못 씀. 그리고 from 에서는 as 못 씀
SELECT e.ename, d.*
FROM emp e, dept d
WHERE upper(e.ename) = upper('smith') AND d.deptno = e.deptno;

-- SELECT ename, * FROM emp; -- 오류남
SELECT ename, emp.* FROM emp;

--SELECT ename, deptno
--FROM emp e, dept d
--WHERE e.deptno = d.deptno;
 -- column ambiguously defined : deptno가 emp 와 dept 둘 다 있기 때문에

SELECT ename, d.deptno, e.*
FROM emp e, dept d
WHERE e.deptno = d.deptno;

SELECT * FROM salgrade;

SELECT e.empno, e.ename, e.job, e.sal, s.*
FROM emp e, salgrade s
WHERE e.sal <= s.hisal AND e.sal >= s.losal
ORDER BY e.sal desc;

SELECT e.empno, e.ename, e.job, e.sal, s.grade
FROM emp e, salgrade s
WHERE e.ename = 'SMITH' AND e.sal BETWEEN s.losal and s.hisal;

SELECT e1.empno, e1.ename, e1.mgr, e2.ename
FROM emp e1, emp e2
WHERE e1.ename = 'SMITH' AND e1.mgr = e2.empno;

SELECT e1.empno, e1.ename, e1.mgr, e2.empno, e2.ename, e2.mgr
FROM emp e1, emp e2
WHERE e1.mgr = e2.empno;
-- where 조건 때문에 하나 빠짐. KING 은 mgr이 null. null 이면 알아서 뺴고 만듦



-- natural join
SELECT deptno
FROM emp e NATURAL JOIN dept d;
-- 같은 거 중복 사라짐. 그래서 select에서 d.deptno 이렇게 안 써도 됨
-- 오히려 d.deptno 이렇게 쓰면 안 됨


-- join using / on
-- natural join 처럼 오히려 select에 d.deptno 이렇게 쓰면 오류남
SELECT *
FROM emp e JOIN dept d USING (deptno) -- 어느 테이블의 deptno인지 안 쓴 게 포인트
ORDER BY deptno, e.empno;
-- natural join 처럼 하나로 합쳐져서 나옴
-- 그리고 기준인 deptno가 맨 앞에 나옴

-- 조인 조건식을 on 에다가 적는 방법
-- select 에 deptno 만 적으면 오류남
SELECT *
FROM emp e JOIN dept d ON (e.deptno = d.deptno)
WHERE sal <= 2000
ORDER BY d.deptno, e.empno;

SELECT e.ename, e.sal, s.grade
FROM emp e JOIN salgrade s ON (e.sal <= s.hisal AND e.sal >= s.losal)
ORDER BY e.sal desc;

SELECT *
FROM emp e1 JOIN emp e2 ON (e1.mgr = e2.empno)
ORDER BY e1.empno;
-- 문제! mgr 밖에 안 나온다.. king 빠짐

-- null 까지 보존해주는 애!!!! : left outer join
SELECT *
FROM emp e1 LEFT OUTER JOIN emp e2 ON (e1.mgr = e2.empno)
ORDER BY e1.empno;

SELECT *
FROM emp e1 right OUTER JOIN emp e2 ON (e1.mgr = e2.empno)
ORDER BY e1.empno;
-- e2를 기준으로 합치면, 부하직원이 없는 사람들까지 나오므로, 13~14줄 보다 많이 나옴

SELECT *
FROM emp e1 full OUTER JOIN emp e2 ON (e1.mgr = e2.empno)
ORDER BY e1.empno;
-- e1도 e2도 모두 출력됨

SELECT e.empno, e.ename, e.deptno, d.dname, e.sal, s.grade
FROM emp e LEFT OUTER JOIN dept d ON (e.deptno = d.deptno) LEFT OUTER JOIN salgrade s ON (e.sal <= s.hisal AND e.sal >= s.losal)
ORDER BY e.sal desc;



-- 문제
-- Q1. 각 부서 별로 급여가 가장 높은 사원, 가장 낮은 사원의 급여 출력
-- Q1-2. 1-1의 급여 차이와 부서 번호 출력
SELECT deptno, max(sal) max, min(sal) min, max(sal)-min(sal) gap
FROM emp
GROUP BY deptno;

-- 226
-- 1
SELECT e.deptno deptno, d.dname dname, e.empno empno, e.ename ename, e.sal sal
FROM emp e LEFT OUTER JOIN dept d ON (e.deptno = d.deptno)
WHERE e.sal >= 2000
ORDER BY e.deptno, e.job;

-- 2
SELECT d.deptno deptno, d.dname dname, floor(avg(e.sal)) avg, max(e.sal) max, min(e.sal) min, count(*) count
FROM emp e LEFT OUTER JOIN dept d ON (e.deptno = d.deptno)
GROUP BY d.deptno, d.dname;

-- 3
SELECT d.deptno deptno, d.dname dname, e.empno empno, e.ename ename, e.job job, e.sal sal
FROM dept d LEFT OUTER JOIN emp e ON (e.deptno = d.deptno)
ORDER BY d.deptno, e.ename;

SELECT deptno, dname, empno, ename, job, sal
FROM dept d LEFT OUTER JOIN emp e USING (deptno)
ORDER BY deptno, ename;


-- 4
SELECT e.deptno deptno, d.dname dname, e.empno empno, e.ename ename, e.mgr mgr, e.sal sal, d.deptno deptno_1,
		s.losal losal, s.hisal hisal, s.grade grade, e2.empno empno, e2.ename ename
FROM dept d
	LEFT OUTER JOIN emp e ON (e.deptno = d.deptno)
	LEFT OUTER JOIN salgrade s ON (e.sal <= hisal AND e.sal >= losal)
	LEFT OUTER JOIN emp e2 ON (e.mgr = e2.empno)
ORDER BY d.deptno, e.empno;





-- 서브쿼리 --

-- smith 보다 급여가 높은 사원
SELECT empno, ename, sal
FROM emp
WHERE sal > (SELECT sal
				FROM emp
				WHERE ename='JONES');

-- 급여가 평균 이상인 사원, 급여
SELECT empno, ename, sal
FROM emp
WHERE sal >= (SELECT avg(sal) avg FROM emp);

SELECT *
FROM emp
WHERE hiredate < (SELECT hiredate
					FROM emp
					WHERE ename='SCOTT')
ORDER BY hiredate;

SELECT e.empno, e.ename, e.job, e.sal, d.*
FROM emp e LEFT OUTER JOIN dept d ON e.deptno = d.deptno
WHERE e.deptno = 20
	AND e.sal > (SELECT avg(sal) FROM emp);


-- 부서별 연봉이 제일 높은 사람 --
SELECT *
FROM emp
WHERE sal IN (SELECT max(sal)
				FROM emp
				GROUP BY deptno)
ORDER BY deptno, empno;
-- 문제가 있음. 안 겹쳐서 예쁘게 나오는 거지,
-- 다른 부서에 똑같은 연봉이 있으면 최대가 아닌데 그 사람이 나올 수도 있음

SELECT *
FROM emp
WHERE (deptno, sal) IN (SELECT deptno, max(sal)
				FROM emp
				GROUP BY deptno)
ORDER BY deptno, empno;


-- from 절 서브쿼리 / with --
SELECT *
FROM (SELECT deptno, ename FROM emp WHERE deptno = 10) e, dept d
WHERE e.deptno = d.deptno;

-- job 별로 카운트 --
SELECT job, count(*)
FROM emp
GROUP BY job
ORDER BY count(*) desc;

SELECT job, count(*)
FROM emp
GROUP BY job
HAVING count(*) >= 3
ORDER BY count(*) desc;

SELECT job, cnt
FROM (SELECT job, count(*) cnt FROM emp GROUP BY job)
WHERE cnt >=3;



-- rownum : 줄번호 매기기 --
SELECT rownum, e.*
FROM emp e
ORDER BY e.sal;
-- 줄 번호 꼬임 --

-- order by 먼저!! --
SELECT rownum, e.*
FROM (SELECT ename, sal FROM emp ORDER BY sal) e;

-- 6~10만 --

--SELECT rownum, e.*
--FROM (SELECT ename, sal FROM emp ORDER BY sal) e
--WHERE rownum = 6;
-- rownum 은 일종의 method 이기 때문에, 이런 식으로 사용 불가능

--SELECT rownum rnum, e.*
--FROM (SELECT ename, sal FROM emp ORDER BY sal) e
--WHERE rnum = 6;
-- 오류!! : invalid identifier / where 가 먼저라서!

-- 페이징과 관련된 쿼리
SELECT *
FROM (
	SELECT rownum rnum, e.*
	FROM (SELECT ename, sal
			FROM emp
			ORDER BY sal) e)
WHERE rnum BETWEEN 6 AND 10;


-- with --
-- 재귀 호출에 사용할 수 있기 때문에 아주 좋고 중요함
-- 무한반복 사용 가능
	-- ex) 무한 대댓글
WITH
e10 AS (SELECT * FROM emp WHERE deptno = 10)
-- 서브 쿼리를 with에 등록해놓고 쓰기
SELECT *
FROM e10;



SELECT 1, 'a' FROM emp;
--	FOR (int i=1; i<=emp.LENGTH; i++) {
--		System.OUT.println(1, "a");
--	}


SELECT  empno,
		ename,
		job,
		sal,
		(SELECT grade
		 	FROM salgrade s
		 	WHERE e.sal BETWEEN losal AND hisal) salgrade,
		deptno,
		(SELECT dname
			FROM dept d
			WHERE e.deptno = d.deptno) deptno
FROM emp e
ORDER BY e.deptno, salgrade;



-- 문제
-- 1. comm이 null 인 사원을 급여 내림차순으로 정렬
SELECT *
FROM emp
WHERE comm IS NULL
ORDER BY sal DESC;

-- 2. 급여 등급 별 사원 수를 등급 오름차순으로 정렬
-- 단, 모든 등급은 표시해야 함
-- 출력 결과: 등급, 카운트
SELECT s.grade, count(e.ename) cnt
FROM salgrade s LEFT OUTER JOIN emp e ON (e.sal >= s.losal AND e.sal <= s.hisal)
GROUP BY s.grade
ORDER BY s.grade, cnt;

-- 3.
-- 출력 : 이름, 급여, 급여 등급, 부서 이름
-- 급여 등급 3 이상, 급여 등급 내림차순, 등급이 같은 경우 급여 내림차순
SELECT ename, sal, grade, dname
FROM emp e
	LEFT OUTER JOIN salgrade s ON (e.sal >= s.losal AND e.sal <= s.hisal)
	LEFT OUTER JOIN  dept d ON (e.deptno = d.deptno)
WHERE s.grade >= 3
ORDER BY s.grade DESC, e.sal DESC;

-- 4. 부서명이 sales 인 사원 중
-- 급여 등급이 2 또는 3인 사원 급여를 내림차순으로 정렬
SELECT *
FROM emp e
	LEFT OUTER JOIN salgrade s ON (e.sal >= s.losal AND e.sal <= s.hisal)
	LEFT OUTER JOIN  dept d ON (e.deptno = d.deptno)
WHERE d.dname = 'SALES'
	AND grade IN (2, 3)
ORDER BY sal DESC;


-- 249
-- 1.
SELECT e.job, e.empno, e.ename, e.sal, e.deptno, d.dname
FROM emp e LEFT OUTER JOIN dept d ON (e.deptno = d.deptno),
	(SELECT * FROM emp WHERE ename = 'ALLEN') a
WHERE e.job = a.job
ORDER BY e.sal DESC, e.empno desc;

-- 2.
SELECT e.empno, e.ename, d.dname, e.hiredate, d.loc, e.sal, s.grade
FROM emp e
	LEFT OUTER JOIN dept d ON (e.deptno = d.deptno)
	LEFT OUTER JOIN salgrade s ON (e.sal BETWEEN s.hisal AND s.losal)
WHERE e.sal >= (SELECT avg(sal) FROM emp)
ORDER BY e.sal DESC, e.empno desc;

-- 3.
SELECT e.empno, e.ename, e.job, e.deptno, d.dname, d.loc
FROM emp e
	LEFT OUTER JOIN dept d ON (e.deptno = d.deptno)
WHERE e.deptno = 10 AND e.job NOT IN (SELECT job
										FROM emp
										WHERE deptno = 30
										GROUP BY job);

-- 4.
SELECT e.empno, e.ename, e.sal, s.grade
FROM emp e 
	LEFT OUTER JOIN salgrade s ON (e.sal >= s.losal AND e.sal <= s.hisal)
WHERE e.sal > (SELECT max(sal) FROM emp WHERE job = 'SALESMAN');




-- 12장
-- discrption  = 설명하다
-- desc map -- dbeaver에서 안 되지만, 원래는 돼아 하는 것

DESC emp; -- dbeaver 에서 안 됨
SELECT * FROM emp;

SELECT lengthb('한') FROM dual;



-- create table --
CREATE TABLE 
EMP_DDL (
	EMPNO NUMBER(4),
	ENAME VARCHAR2(10),
	JOB VARCHAR2(9),
	MGR NUMBER(4),
	HIREDATE DATE,
	SAL NUMBER(7,2),
	COMM NUMBER(7,2),
	DEPTNO NUMBER(2)
);
-- 한 번 CREATE 하면 이미 있음으로 오류남

SELECT * FROM EMP_DDL;

CREATE TABLE dept_ddl
AS SELECT * FROM dept;

SELECT * FROM dept_DDL;

CREATE TABLE emp_ddl_30
AS SELECT * FROM emp WHERE deptno = 30;
RENAME emp_ddl_31 TO emp_ddl_30;

SELECT * FROM emp_ddl_30;


-- 틀만 만드는 방법
CREATE TABLE empdept_ddl
AS SELECT e.empno, e.ename, e.job job2, e.mgr, e.hiredate, e.sal, e.comm, d.deptno, d.dname, d.loc
FROM emp e, dept d
WHERE 1<>1;

SELECT * FROM empdept_ddl;



------ alter table ------
CREATE TABLE emp_alter
AS SELECT * FROM emp;

SELECT * FROM emp_alter;
-------------------------
-- ADD
ALTER TABLE emp_alter
ADD hp varchar2(20);

SELECT * FROM emp_alter;

-- RENAME
ALTER TABLE emp_alter
RENAME COLUMN hp TO tel;

SELECT * FROM emp_alter;

-- MODIFY
ALTER TABLE emp_alter
MODIFY empno number(5);
-- 이미 empno가 4자리 : 이것보다 줄이는 방향으로는 못 감
-- 다른 타입으로 변경할 때, 내용에 null 만 있을 때만 가능
	-- 결함이 없어야 하기 때문에 제약 사항이 많음

-- DROM COLUMN
ALTER TABLE emp_alter
DROP COLUMN tel;

SELECT * FROM emp_alter;
-------------------------


-- rename
RENAME emp_alter TO emp_rename;

SELECT * FROM emp_rename;


-- truncate : 내용물 지우기, 롤백 불가능
TRUNCATE TABLE emp_rename;
-- 되돌리기 불가능...
SELECT * FROM emp_rename;


-- drop : 테이블 자체 지우기
DROP TABLE emp_rename;




------------------------
--        10장         --
------------------------

------ INSERT INTO ------
CREATE TABLE dept_temp
AS SELECT * FROM dept;
-------------------------
SELECT * FROM dept_temp;

INSERT INTO dept_temp (deptno, dname, loc)
VALUES (50, upper('database'), upper('seoul'));

SELECT * FROM dept_temp;

INSERT INTO dept_temp -- 전체 열에 추가할 때, 컬럼명 안 써도 순서대로 삽입됨
VALUES (60, 'Network', upper('busan'));

SELECT * FROM dept_temp;

INSERT INTO dept_temp
VALUES (70, 'WEB', null);

SELECT * FROM dept_temp;

INSERT INTO dept_temp
VALUES (80, 'MOBILE', '');
-- 따옴표만 적어도 null 입력되지만, 잘 사용하진 않음

SELECT * FROM dept_temp;

INSERT INTO dept_temp (deptno, loc)
VALUES (90, 'INCHEON');
-- 안 적으면 자동으로 null 들어감 (암묵적인 방법)

SELECT * FROM dept_temp;



-- 날짜 데이터 입력하기

CREATE TABLE emp_temp
AS SELECT * FROM emp WHERE 1<>1;

SELECT * FROM emp_temp;

INSERT INTO emp_temp (empno, ename, hiredate)
VALUES (9999, '홍길동', '2026/01/27');
-- 양식 다른데 잘 들어감
-- 자동으로 인식하긴 하는데 안 통할 수 있으니까...

SELECT * FROM emp_temp;

-- 안전하게 날짜 추가하는 방법!
INSERT INTO emp_temp (empno, ename, hiredate)
VALUES (7051, '최민수', to_date('2026-01-27', 'yyyy-mm-dd'));

SELECT * FROM emp_temp;

INSERT INTO emp_temp (empno, ename, hiredate)
VALUES (3111, '심청', sysdate);

SELECT * FROM emp_temp;


-- 다른 테이블에 있는 거 한 번에 옮겨넣기
	-- 당연히 구조가 같아야만 하겠지..
INSERT INTO EMP_TEMP
SELECT * FROM EMP WHERE DEPTNO = 10;

SELECT * FROM EMP_TEMP;

-- 한 번에 넣는 방법
-- 근데 오라클에선 잘 쓰이진 않음... 큰 차이 없어서...
-- 그치만? 취업한 데가 오라클을 쓸까 과연?ㅎ
INSERT ALL
INTO EMP_TEMP (empno, ename, hiredate)
	VALUES (3112, '심청2', sysdate)
INTO EMP_TEMP (empno, ename, hiredate)
	VALUES (3113, '심청3', sysdate)
INTO EMP_TEMP (empno, ename, hiredate)
	VALUES (3114, '심청4', sysdate)
INTO EMP_TEMP (empno, ename, hiredate)
	VALUES (3115, '심청5', sysdate)
SELECT * FROM dual;
-- SELECT * FROM DUAL 필수!!!!

SELECT * FROM EMP_TEMP;




------- UPDATE -------
CREATE TABLE DEPT_TEMP2
AS SELECT * FROM DEPT;
--------------------------- SAVE POINT : 롤백하면 여기로 돌아감
SELECT * FROM DEPT_TEMP2;

UPDATE DEPT_TEMP2
	SET LOC = 'SEOUL'; -- WHERE 조건 없이 쓸거야? 쓰면 너 다 바뀐다?

UPDATE DEPT_TEMP2
	SET LOC = 'BUSAN'
WHERE DEPTNO=20;

-- 롤백 안 됨!
ALTER TABLE DEPT_TEMP2
RENAME COLUMN LOC TO LOCATION;

ALTER TABLE DEPT_TEMP2
RENAME COLUMN LOCATION TO LOC;

SELECT * FROM DEPT_TEMP2; -- 모든 LOC의 값이 SEOUL 로 바뀜


ROLLBACK;
-- INSERT, UPDATE, DELETE 의 실행 취소

SELECT * FROM DEPT_TEMP2;

-- UPDATE, DELETE 실행하기 전에 제대로 잡히는지 먼저 확인하는 습관 필요함
SELECT * FROM DEPT_TEMP2
WHERE DEPTNO = 40;

UPDATE DEPT_TEMP2
SET DNAME = 'DATABASE', LOC = 'SEOUL'
WHERE DEPTNO = 40;

SELECT * FROM DEPT_TEMP2;

UPDATE DEPT_TEMP2
SET DNAME = (SELECT DNAME
				FROM DEPT
				WHERE DEPTNO = 40),
	LOC = (SELECT LOC
				FROM DEPT
				WHERE DEPTNO = 40)
WHERE DEPTNO = 40;

SELECT * FROM DEPT_TEMP2;


CREATE TABLE EMP_TMP
AS SELECT * FROM EMP;

SELECT * FROM EMP_TMP;

SELECT ENAME, SAL, SAL * 1.08 FROM EMP_TMP
WHERE SAL < 1000;
-- SMITH 864, JAMES 1026

UPDATE EMP_TMP
SET SAL = SAL*1.08
WHERE SAL < 1000;

SELECT * FROM EMP_TMP
WHERE ENAME IN ('SMITH', 'JAMES');



------ DELETE -------
CREATE TABLE EMP_TEMP2
AS SELECT * FROM EMP;
------------------------------ SAVE POINT
SELECT * FROM EMP_TEMP2;

-- TRUNCATE 는 새로 NEW 를 하면서 다 날려버리는 느낌이면
-- DELETE 는 반복문을 돌며 전부 NULL 로 만드는 느낌

DELETE FROM EMP_TEMP2
WHERE JOB = 'MANAGER';

SELECT * FROM EMP_TEMP2; -- 3명 지워짐

ROLLBACK; -- 롤백 가능!
SELECT * FROM EMP_TEMP2;

DELETE FROM EMP_TEMP2;
SELECT * FROM EMP_TEMP2;

ROLLBACK;
SELECT * FROM EMP_TEMP2;

DELETE FROM EMP_TEMP2
WHERE JOB = 'MANAGER';

SELECT * FROM EMP_TEMP2;

COMMIT; ------------------------ SAVE POINT

SELECT * FROM EMP_TEMP2;

ROLLBACK;

SELECT * FROM EMP_TEMP2; -- 11명

COMMIT; --------------------------------







------- 13장 -------
-- 데이터 사전

-- 데이터 사전 사용 설명서
SELECT * FROM DICT;

-- 내가 가지고 있는 모든 테이블 정보
SELECT * FROM USER_TABLES;



------ INDEX ------
-- 더 빠른 검색을 위해 정렬해주는 것
-- 돈 되는 기술...

CREATE INDEX IDX_EMP_SAL
ON EMP(SAL ASC);

SELECT * FROM USER_INDEXES;
SELECT * FROM USER_IND_COLUMNS;

SELECT ENAME, SAL FROM EMP WHERE SAL = 3000;


-- 강제로 인덱스 타게 하기
-- 강제 힌트 주기
-- 주석처럼 생겼지만 주석 아님
SELECT /*+ INDEX(E IDX_EMP_SAL) */
	ENAME, SAL
FROM EMP E
WHERE SAL = 3000;
-- TABLE ACCESS : FULL > BY INDEX ROWID



------ VIEW ------
-- 조회 전용, 수정 불가능

-- 사용 목적
	-- 1. 편리성: SELECT 문이 복잡할 때, 이를 변수에 넣고 쓰는 느낌으로
	-- 2. 보안성: 테이블의 일부 열을 보여주고 싶지 않을 때
		-- EX) DEPT 테이블의 DNAME만 보여주고, LOC는 보여주고 싶지 않을 때
		--		EMP 테이블에 DNAME만 붙여놓고 VIEW 하여, VIEW 테이블에 대한 권한만 주는 식

CREATE VIEW VW_EMP20
AS (SELECT EMPNO, ENAME, JOB, DEPTNO
	FROM EMP
	WHERE DEPTNO=20);

SELECT * FROM VW_EMP20;

SELECT *
FROM VW_EMP20
WHERE JOB = 'CLERK';

--DROP VIEW VW_EMP20;



------ SEQUENCE ------
-- 규칙에 따라 순번을 생성
-- 호출할 때마다 1씩 올라감 (5, 10씩 올라가게 STEP을 정할 수 있음)
	-- EX) 게시판 글에 번호 부여

CREATE TABLE DEPT_SEQ
AS SELECT * FROM DEPT WHERE 1<>1;

SELECT * FROM DEPT_SEQ;

CREATE SEQUENCE SEQ_DEPT;

SELECT * FROM USER_SEQUENCES;

SELECT SEQ_DEPT.NEXTVAL FROM DUAL; -- 다음 값(NEXT VALUE) 조회할 때마다 1개씩 올라감
SELECT SEQ_DEPT.CURRVAL FROM DUAL; -- 지금 값(CURRENT VALUE) 조회해도 숫자 변경 안 됨
-- NEXTVAL 을 한 번은 실행하고 나서 CURRVAL 사용 가능


CREATE SEQUENCE SEQ_DEPT_10
START WITH 10
INCREMENT BY 10;

SELECT SEQ_DEPT_10.NEXTVAL FROM DUAL;
SELECT SEQ_DEPT_10.CURRVAL FROM DUAL;

INSERT INTO DEPT_SEQ (DEPTNO, DNAME, LOC)
VALUES (SEQ_DEPT_10.NEXTVAL, 'DATABASE', 'SEOUL');

INSERT INTO DEPT_SEQ (DEPTNO, DNAME, LOC)
VALUES (SEQ_DEPT_10.NEXTVAL, 'DATABASE2', 'SEOUL2');

SELECT * FROM DEPT_SEQ;

SELECT * FROM EMP;



------ CONSTRAINT : 제약조건 ------
SELECT * FROM USER_CONSTRAINTS; -- 제약 조건 확인

-- 방법1
-- PK를 2개 이상 줄 수 없음
	-- PK는 하나만 지정할 수도 있고, 필요해 의해 2개 이상 지정 가능함
CREATE TABLE TABLE_PK (
	LOGIN_ID VARCHAR2(20) PRIMARY KEY,
	LOGIN_PW VARCHAR2(20) NOT NULL,
	TEL VARCHAR2(20)
);


SELECT * FROM TABLE_PK;

SELECT * FROM USER_INDEXES;
-- PK를 지정하면 INDEX가 자동으로 생성됨


INSERT INTO TABLE_PK
VALUES ('ID1', 'PW1', NULL);

SELECT * FROM TABLE_PK;

-- ID 중복
INSERT INTO TABLE_PK
VALUES ('ID1', 'PW1', NULL);
-- 에러 발생 : unique constraint (SCOTT1_17.SYS_C0038210) violated
	-- UNIQUE 제약을 위반했음
	-- ID가 PK 였기 때문
	-- PK = NOT NULL + UNIQUE


-- PW NOT NULL
INSERT INTO TABLE_PK
VALUES ('ID2', NULL, NULL);
-- 에러 발생 : cannot insert NULL into ("SCOTT1_17"."TABLE_PK"."LOGIN_PW")

INSERT INTO TABLE_PK (LOGIN_ID)
VALUES ('ID3');
-- 에러 발생 : cannot insert NULL into ("SCOTT1_17"."TABLE_PK"."LOGIN_PW")

INSERT INTO TABLE_PK (LOGIN_ID)
VALUES (NULL);
-- cannot insert NULL into ("SCOTT1_17"."TABLE_PK"."LOGIN_ID")


SELECT * FROM TABLE_PK; -- ID1, PW1

UPDATE TABLE_PK
SET LOGIN_ID = NULL
WHERE LOGIN_ID = 'ID1';
-- cannot update ("SCOTT1_17"."TABLE_PK"."LOGIN_ID") to NULL


INSERT INTO TABLE_PK
VALUES ('ID2', 'PW2', NULL);

SELECT * FROM TABLE_PK;


-- ID2 를 ID1 으로 수정 시도
UPDATE TABLE_PK
SET LOGIN_ID = 'ID1'
WHERE LOGIN_ID = 'ID2';
-- unique constraint (SCOTT1_17.SYS_C0038210) violated
-- 이미 있는 값과 중복되므로 변경 불가능


-- 방법2
-- PK 1개 이상(2개 이상도 가능)
CREATE TABLE TABLE_PK2 (
	LOGIN_ID VARCHAR2(20) PRIMARY KEY,
	LOGIN_PW VARCHAR2(20) PRIMARY KEY,
	TEL VARCHAR2(20)
);

-- 에러 발생 : table can have only one primary key
	-- PK 는 2개 이상 안 돼요

-- PK 2개 이상 지정하는 방법
CREATE TABLE TABLE_PK2 (
	LOGIN_ID VARCHAR2(20),
	LOGIN_PW VARCHAR2(20),
	TEL VARCHAR2(20),
	
	PRIMARY KEY (LOGIN_ID, LOGIN_PW)
);

SELECT * FROM USER_CONSTRAINTS;


-- 방법3 : ALTER 이용
-- 1개 이상
CREATE TABLE TABLE_PK3 (
	LOGIN_ID VARCHAR2(20),
	LOGIN_PW VARCHAR2(20),
	TEL VARCHAR2(20)
);

ALTER TABLE TABLE_PK3
ADD PRIMARY KEY (LOGIN_ID, LOGIN_PW);

-- 방법4
-- 1개만
ALTER TABLE TABLE_PK3
MODIFY LOGIN_ID PRIMARY KEY;


-- FOREIGN KEY
CREATE TABLE DEPT_FK (
	DEPTNO NUMBER(2) PRIMARY KEY,
	DNAME VARCHAR2(14),
	LOC VARCHAR2(13)
);

SELECT * FROM DEPT_FK;

CREATE TABLE EMP_FK (
	EMPNO NUMBER(4) PRIMARY KEY,
	ENAME VARCHAR2(10),
	DEPTNO NUMBER (2) REFERENCES DEPT_FK(DEPTNO)
);

SELECT * FROM EMP_FK;

INSERT INTO EMP_FK
VALUES (1, '이름', NULL);

INSERT INTO EMP_FK
VALUES (2, '이름2', 2);
-- integrity constraint (SCOTT1_17.SYS_C0038279) violated - parent key not found

SELECT * FROM EMP_FK;

INSERT INTO DEPT_FK
VALUES (10, '부서', '위치');

SELECT * FROM DEPT_FK;

INSERT INTO EMP_FK
VALUES (2, '이름2', 10);
INSERT INTO EMP_FK
VALUES (3, '이름3', 10);


SELECT * FROM EMP_FK;

UPDATE EMP_FK
SET DEPTNO = 20
WHERE DEPTNO = 10;
-- 없는 값으로 UPDATE 안 됨


-- 쳐다보고 있는 원본 값, 삭제 및 변경 안 됨
DELETE DEPT_FK
WHERE DEPTNO = 10;
-- 에러 발생 : integrity constraint (SCOTT1_17.SYS_C0038279) violated - child record found

DROP TABLE DEPT_FK;
-- 에러 발생 : unique/primary keys in table referenced by foreign keys

UPDATE DEPT_FK
SET DEPTNO = 20
WHERE DEPTNO = 10;
-- integrity constraint (SCOTT1_17.SYS_C0038279) violated - child record found

SELECT * FROM DEPT_FK;
SELECT * FROM EMP_FK;

TRUNCATE TABLE DEPT_FK;
-- 에러 발생 : unique/primary keys in table referenced by enabled foreign keys

SELECT * FROM USER_CONSTRAINTS;


-- 쳐다보고 있는 애 없애기
DELETE EMP_FK
WHERE DEPTNO = 10;

UPDATE DEPT_FK
SET DEPTNO = 20
WHERE DEPTNO = 10;

SELECT * FROM DEPT_FK;
SELECT * FROM EMP_FK;



--- 실습 ---
/* 1. 학원 학생 관리 테이블들
	- 학생 : 학생이름, 연락처, 자리번호, 강의실, 강의실위치(7층), 취미
	- 1차 정규화 : 취미 테이블
		- 취미 : 시퀀스, 취미 종류
	- 2차 정규화 : 
	- 3차 정규화 : 강의실 테이블 */

/* todo
 * 사용자 1 id, 사용자 2id
 * 사용자 1의 할일, 사용자 1의 할일상태
 * 
 * 설문조사
 * 설문조사이름, 설문조사 설명, 질문1, 답변1, 질문2, 답변2,
 * 숙박예약
 * 
 * 배달주문관리
 * 가게명, 가게 전화번호, 가게 주소, 메뉴들, 가격, 주문한메뉴들 (각각 메뉴명, 주문수량), 결제방법, 결제수단, 포장/배달, 주문자주소, 주문자전화번호
 * 영수증 - 주문상세내역들
 * 
 * 숙박예약 */

