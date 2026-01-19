package sec02;

public class CarExam {
	// 필드
	static int a = 10; // static이 붙어있는 곳에서는 static이 붙어있는 것만 사용 가능
	static Car my = new Car();
	
	public static void main(String[] args) {
		// 메소드
		
		// Car 클래스를 생성해서 myCar에 담기
//		sec02.Car myCar = new Car(); // 아래랑 같은 거임^^
		Car myCar = new Car(); // 이 안에 Car 클래스의 변수가 다 있는 거임
		
		// 가져와서 사용하는 방법
		System.out.println("myCar.company: " + myCar.company); // 현대
		myCar.company = "포르쉐"; // 여기서 새로 할당 가능!!
		System.out.println("myCar.company: " + myCar.company); // 포르쉐
		
		System.out.println("myCar.speed: " + myCar.speed); // 0 : 초기값
		myCar.speed = 170;
		System.out.println("myCar.speed: " + myCar.speed); // 170
		
		Car myCar2 = new Car();
		System.out.println("myCar.company: " + myCar2.company); // 현대 (!포르쉐)
		// 같은 설계도이지만 구조는 전혀 다름
		
		System.out.println("a: " + a);
		System.out.println("my.model: " + my.model);
		
		
		// 깜짝퀴즈
		// China 클래스 만들기
		// 필드
		// name = 가게명(기본값)
		// address = 주소(null)
		// menus = 2개 이상의 메뉴를 가지는 String 배열
		
		// ChinaExam
		// 2개의 중국집 개업하기
		// 1. 필드값 출력
		// 2. 필드값 바꾸고 출력
		// 3. 또 다른
		
		
		
	} // method end

} // field end
