package quiz.quiz1_0120;

import java.util.ArrayList;

public class EmpExam {

	public static void main(String[] args) {
		
		/** 문제5
		 * Emp
		 * - 사번, 이름, 직급, 연봉, 상사의 사번
		 * - 모든 정보를 출력하는 메소드 info()
		 * EmpExam
		 * - Emp를 3명 이상 만들기
		 * - 반복문으로 각자의 info() 실행
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
		
		
//		Emp emp1 = new Emp(1, "a", "manager", 3000, 0);
//		
//		Emp emp2 = new Emp(2, "b", "salesman", 2500, 1);
//
//		Emp emp3 = new Emp(3, "c", "salesman", 2500, 1);
		
		Emp[] empList = {
				new Emp(1, "a", "manager", 3000, 0),
				new Emp(2, "b", "salesman", 2000, 1),
				null,
				new Emp(3, "c", "salesman", 1500, 2),
				new Emp(4, "d", "clerk", 2500, 1)
		};
		
//		ArrayList emp = new ArrayList();
//		emp.add(new Emp(1, "a", "manager", 3000, 0));
		
		for (int i=0; i<empList.length; i++) {
			
			if (empList[i] == null) { // 방어코딩!
				continue;
			}
			
			empList[i].viewInfo();
		}
		
//		empTable.viewInfo();
		
		
		
		
		EmpTable empTable = new EmpTable();
		
		for (int i=0; i<empList.length; i++) {
			
			if (empList[i] == null) { // 방어코딩!
				continue;
			}
			
			empTable.inputEmp(empList[i]);
		}
		
//		empTable.inputEmp(emp2);
//		empTable.inputEmp(emp3);
		
		
//		for (int i=0; i<empTable.empList.size(); i++) {
//			if (emp2.pay >= 3000) {
//				((Emp)empList.get(i)).viewInfo();
//				System.out.println();
//			}
//		}
		
		empTable.standard = 2500;
		
		for (int i=0; i<empList.length; i++) {
			
			if (empList[i] == null) { // 방어코딩!
				continue;
			}
			
			empTable.viewPay (empList[i]);
		}
		System.out.println();

//		empTable.viewPay (emp1);
//		empTable.viewPay (emp2);
//		empTable.viewPay (emp3);

		
		for (int i=0; i<empList.length; i++) {
			
			if (empList[i] == null) { // 방어코딩!
				continue;
			}
			
			empTable.viewManager(empList[i]);
		}
		
//		empTable.viewManager(emp3);
		
		
	} // method end

}
