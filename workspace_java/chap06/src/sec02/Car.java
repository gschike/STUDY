package sec02;

public class Car {
	
	// 필드 (field)
	
	// 필드 선언과 동시에 초기화
	String company = "현대";
	String model = "제네시스";
	int maxSpeed = 240;
	
	// 필드에는 선언, 선언과 동시에 초기화 하는 것만 가능 (int speed = 10; 은 가능)
	int speed; // 현재 속도 : 선언만 하고 초기화 안 된 상태 - 초기값은 0
	// 초기값
	// 0, false, null(참조타입) 이 기본
	
	// 필드 영역에서는 실행(행동) 할 수 없음. 메소드에서 가능
//	speed = 10; // speed에 할당하는 행동 : 불가능!!!!
	
}
