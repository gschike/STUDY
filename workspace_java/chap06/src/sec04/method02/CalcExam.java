package sec04.method02;

public class CalcExam {

	public static void main(String[] args) { // java에서 유일하게 자동 실행해주는 method
		
		Calc calc = new Calc();
		calc.powerOn(); // void sec04.Calc.powerOn()
		System.out.println();
		
//		int a = calc.plus(5, 7); // int sec04.Calc.plus(int x, int y) // x, y 값 출력
//		System.out.println();
//		System.out.println("a: " + a); // 12 출력
//		System.out.println();
//		
//		// 호출할 때 이름과 전달인자를 꼭 맞춰야 실행됨
//		
//		int i =4;
//		a = calc.plus(i, 10);
//		System.out.println("a: " + a); // 14 출력
//		
//		
//		System.out.println("----------------------");
		
		
		
		double b = calc.divide(10, 3);
		System.out.println("b: " + b);
		
		

		System.out.println("----------------------");
		
		
		calc.number();
		
		
	} // main end

} // class end
