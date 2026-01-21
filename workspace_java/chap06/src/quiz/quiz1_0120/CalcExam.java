package quiz.quiz1_0120;

public class CalcExam {

	public static void main(String[] args) {
		
		/** 문제 9 (계산기)
		 * 
		 * 유일한 메소드 calc
		 * 	전달인자 3개 (ArrayList)
		 * 	값1, 연산자, 값2 (3, "-", 2)
		 * 	결과를 return
		 * 
		 * while로 종료 입력할 때까지
		 */
		
		Calc calc = new Calc();
		calc.Calc(3, "+", 3);
		calc.Calc(1, "-", 3);
		calc.Calc(2, "*", 3);
		calc.Calc(1, "/", 10);
		calc.Calc(1, "/", 0);
		calc.Calc(1, ".", 3);
		calc.Calc(1, "%", 3);
		
		/** 문제 9-1
		 * 계산 했던 로그(히스토리)를 확인하는 메소드 추가
		 */
		
		calc.log();
		
	} // method

} // field
