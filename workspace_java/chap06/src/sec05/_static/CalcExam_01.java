package sec05._static;

public class CalcExam_01 {
	
	int a = 10; // new가 되어야 사용 가능

	public static void main(String[] args) {
		
		int r = 3;
		double a = Calc.pi * r*r; // static은 new 전에 사용할 수 있음
		
		System.out.println(a);
		
		Calc c1 = new Calc();
		c1.color = "skyblue";
		
		Calc c2 = new Calc();
		c2.color = "pink";
		
		System.out.println(c1.color);
		System.out.println(c2.color);
		
		System.out.println(Calc.pi);
		System.out.println(c1.pi);
		
		c1.pi = 3.1415926535; // c1, c2를 벗어나 공용으로 사용되기 때문에, c1, c2 라고 되어있어도 결국 Calc인 것
		// c1.pi == Calc.pi
		// c1.pi 라고 하면 heap 영역의 c1을 찾아가고, 거기서 method 영역의 Calc를 또 찾아가게 됨
		// 반면에 Calc.pi 라고 하면 바로 method 영역으로 찾아감
		// 즉, 어떻게 해도 Calc의 pi를 찾아가기 때문에, c1을 변경해도 c2까지 변경되는 것
		System.out.println(c2.pi); // 3.1415926535
		
		System.out.println(Math.PI); // 얘도 static임! Math.random()도 마찬가지!
		
		Calc.test();

		
		
		// static 에서는 static만 사용 가능
//		eat(); // new를 해야 쓸 수 있음

		// 이렇게는 가능
//		CalcExam_01 c = new CalcExam_01();
//		c.eat();
		
//		this.a = 10; // this도 사용 불가능
		// this는 new가 된 나, 즉, 인스턴스를 뜻하므로
		// new 이전에 사용 가능한 static에서는 사용하지 못함
		// 참고로 여기는 static void main 안쪽임
		
		eat(); // static void는 사용 가능!
		
	} // end
	

//	void eat() {
//		System.out.println("먹는다");
//	}
	
	static void eat() {
		System.out.println("먹는다 static");
	}

} // end
