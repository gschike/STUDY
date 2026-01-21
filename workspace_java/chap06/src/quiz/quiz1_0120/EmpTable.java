package quiz.quiz1_0120;

import java.util.ArrayList;

public class EmpTable {

//	 * EmpTable
//	 * - 사원 추가(Emp-전달인자)
//	 * - arraylist
//	 * - 출력(): 모든 사원 정보를 출력 
//	 * 
//	 * EmpExam
//	 * - EmpTable 생성
//	 * - Emp 3명 이상 생성
//	 * - EmpTable에 모두 넣고
//	 * - EmpTabel에 있는 모든 Emp 정보 출력

	ArrayList empList = new ArrayList();

	void inputEmp(Emp e) {
		this.empList.add(e);
	}

	void viewInfo() {
		for (int i = 0; i < empList.size(); i++) {
			((Emp) empList.get(i)).viewInfo();
			System.out.println();
		}
	}
	
	int standard;
	void viewPay (Emp e) {
		if (e.pay >= this.standard) {
			System.out.println("연봉이 " + standard + " 이상인 사람: " + e.empName);
		}
	}
	
	void viewManager(Emp e) {
		System.out.println(e.empName + "의 상사 사번: " + e.mNum);
	}

	

}
