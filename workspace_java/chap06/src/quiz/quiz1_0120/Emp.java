package quiz.quiz1_0120;

import java.util.ArrayList;

public class Emp {
	/** 문제5
	 * Emp
	 * - 사번, 이름, 직급, 연봉, 상사의 사번
	 * 
	 * EmpTable
	 * - 사원 추가(Emp-전달인자)
	 * - arraylist
	 * - 출력(): 모든 사원 정보를 출력 
	 * 
	 * EmpExam
	 * - EmpTable 생성
	 * - Emp 3명 이상 생성
	 * - EmpTable에 모두 넣고
	 * - EmpTabel에 있는 모든 Emp 정보 출력
	 */
	
	// 5-1. 연봉이 2000만원 이상인 사원만 출력
	
	// 5-2. 사원1의 상사가 누구인지 출력
	
	int empNum;
	String empName;
	String job;
	int pay;
	int mNum;
	
	
	Emp (int empNum, String empName, String job, int pay, int mNum) {
		this.empNum = empNum;
		this.empName = empName;
		this.job = job;
		this.pay = pay;
		this.mNum = mNum;
	}

	
	void viewInfo() {
		
		System.out.println("사원번호: " + this.empNum);
		System.out.println("사원이름: " + this.empName);
		System.out.println("직급: " + this.job);
		System.out.println("급여: " + this.pay);
		System.out.println("상사 사번: " + this.mNum);
		System.out.println();
		
	}
	
	
//	ArrayList emp = new ArrayList();
//
//	void inputEmp() {
//		emp.add("사원번호: " + this.empNum);
//		emp.add("사원이름: " + this.empName);
//		emp.add("직급: " + this.job);
//		emp.add("급여: " + this.pay);
//		emp.add("상사 사번: " + this.mNum);
//	}
	
	
}
