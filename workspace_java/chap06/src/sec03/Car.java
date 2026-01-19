package sec03;

public class Car {
	
	// 생성자 : 리턴타입 없이, 클래스명과 똑같은 메서드명
//	Car() {
//		System.out.println("Car 생성자 실행");
//	}
	
	// 생성자를 생략한 경우
	// 즉, 생성자가 하나도 없는 경우
	// 기본 생성자가 자동 완성됨
//	Car() {	} // 기본 생성자. 생성자가 하나라도 있으면, 기본 생성자는 만들어지지 않음
	
	
//	String brand = "KIA";

	String brand;
//	Car() {
//		brand = "KIA";
//	}
	// 보통 생성자는 필드값을 초기화 하는데 많이 사용됨
	
	
//	Car(String b) {
//		brand = b;
//	}
	
//	Car() {
//		int b = 5 / 0; // 무조건 예외 발생
//	}
	
	String model;
	int maxSpeed;
	
	Car(String b, String m, int ms) {
		brand = b;
		model = m;
		maxSpeed = ms;
	}
	
	// 생성자 오버로딩 가능
	Car() {
//		brand = "현대";
//		model = "제네시스";
//		maxSpeed = 240;
				
//		Car(); // 메서드는 메서드 안에 다른 메서드나 자기 자신 불러오기 가능했지만, 생성자는 안 됨
		
		// 다른 오버로딩된 생성자 호출 : this()
		this ("현대", "제네시스", 240);
		// Constructor call must be the first statement in a constructor : this는 주석을 제외하고 가장 첫 줄에 있어야 함
		System.out.println("this 다음에 다른 거 쓰기 가능~");
	}
	
	
}
