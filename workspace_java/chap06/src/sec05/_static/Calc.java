package sec05._static;

import java.util.Scanner;

public class Calc {
	
	/** 하나라도 언급되는 순간
	 * Static은 모두 로딩된다
	 */
	
	// 둘 다 그냥 변수
	
	String color;
	
	// static은 method 영역에 올라감. 누가 사용하지 않더라도.
	// 따라서, new를 하지 않더라도 사용 가능
	// gc가 수거하지도 않음
	// 어차피 변수이긴 함: 정적멤버, 공용변수, 클래스 변수 라고 부름
	static double pi = 3.14;
	
	// 				클래스.변수
	int int_max = Integer.MAX_VALUE; // new 하지 않고 사용할 수 있는 static
	
	static int price;
//	price = 100; // 필드에서 초기화 안 됨
	
	{ // 필드 영역에 있는 중괄호
		System.out.println("필드에 있는 실행 블럭");
		// new Calc 결과
		// 엥
		// Calc 생성자 실행
		// -> 필드 영역이 먼저 실행되고, 생성자 실행
	}

	static { // 실행 영역 자체가 static이 될 수도 있음
		System.out.println("필드에 있는 static 실행 블럭");
//		Scanner s = new Scanner (System.in);
//		price = s.nextInt() + 10; // static 값은 static 블럭에서 초기화 가능함
		
		// new를 하거나 Calc의 static 요소를 하나라도 실행하면 실행됨
		// Calc.pi 만 있을 때 실행됨
		// new Calc 만 있을 때 실행됨
	}
	
	
	Calc() { 
		System.out.println("Calc 생성자 실행");
		
		this.price = 100; // 실제로 new 하면 바뀌긴 하나, static은 new 전에 사용하여야 하기 때문에...
		Calc.price = 100; // 더 좋은 코드
	}
	
	
	static void test() {
		System.out.println("정상작동");
//		this.color = "blue"; // 사용 불가능. static 안에서 인스턴스는 사용 불가! static만 사용 가능!
	}
	
	
	
}
