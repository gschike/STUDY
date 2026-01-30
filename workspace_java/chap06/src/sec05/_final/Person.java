package sec05._final;

public class Person {

	final String nation = "Korea";
	// 값을 할당한 경우(최초 초기화) 변경할 수 없게 막아줌
	
	// ssn : social security number (주민번호)
	final String ssn;
	
	Person(String ssn) {
//		this.nation = "asdf"; // The final field Person.nation cannot be assigned
		// final이고, 한 번 초기화됐기 때문에 바꿀 수 없음
		
		// 선언할 때 값이 없으면, 딱 한 번 할당 가능
		this.ssn = ssn;
		
		
		// 클래스는 아니고 변수이긴 하나, 파이널 필드와 같은 동작이 들어가기 때문에
		// a.length는 고정, 변경할 수 없음
		// readonly 개념
//		int[] a = new int[3];
//		a.length = 10; // The final field array.length cannot be assigned
	}
	
	
	
	
} // end
