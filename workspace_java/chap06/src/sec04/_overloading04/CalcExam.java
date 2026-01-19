package sec04._overloading04;

public class CalcExam {

	public static void main(String[] args) {
		
		Calc calc = new Calc();
		
		calc.plus(2, 5); // int int
		calc.plus(2, 5.0); // int double
		calc.plus(2, (int)5.0); // int int
		calc.plus(5.0, 2); // double double
		
		System.out.println("문자");
		System.out.println(1);
		System.out.println();
		
		calc.plus(5);
		
		
		calc.fitness("덤벨", 20, 3);
		
		
	} // method end

} // field end
