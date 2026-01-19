package sec04._overloading04;

public class Calc {

	// overloading : 이름은 같은데 전달인자(수, 타입)가 다른 거
	
	int plus (int a, int b) {
		System.out.println("int int 실행");
		return a+b;
	}
	
	// 타입이 다르기 때문에, 메서드명이 같아도 다른 메서드로 존재할 수 있음
	double plus (double a, double b) {
		System.out.println("double double 실행");
		return a+b;
	}

//	double plus (double x, double y) { // 이거는 안 됨! 전달인자의 타입과 개수를 봄
//		System.out.println("double double 실행");
//		return x+y;
//	}

	double plus (int a, double b) {
		System.out.println("int double 실행");
		return a+b;
	}
	
	int plus (int x) {
		return plus(x, x); // int int 실행
	}
	
	
	
	// 오늘 운동
	String type;
	int min;
	int set;
	
	void fitness(String t, int m, int s) {
		type = t;
		min = m;
		set = s;
	}

	void fitness(String t, int m) {
//		type = t;
//		min = m;
//		set = 5; // 하드코딩

		fitness(t, m, 5);
	}
	
	void fitness(String t) {
		fitness (t, 3, 5);
	}
	
	
	
} // field end
