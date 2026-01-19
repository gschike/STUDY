package sec04.method02;

import java.util.ArrayList;
import java.util.Scanner;

public class Calc {
	
//	int a;
	
	// 메소드 선언
	void powerOn() {
//		a = 10; // 실행 가능!
		
		System.out.println("전원을 켭니다.");
		
	}
	
	
	// 잠깐 return 배우고 왔음!
	
	
	double plus(double x, double y) { // return 쓰기 전에 빨간줄 : This method must return a result of type int
		
		System.out.println("x: " + x);
		System.out.println("y: " + y);
		
		double result = x + y;
//		return 1; // 이런 식으로 int면 뭐든 가능. 단 return "결과"; 는 string이어서 안 됨
		
		System.out.println(result);
		return result;
	}
	
	/** 
	 * javadoc 주석
	 * - 여기에 할 일을 적어놓으면 좋음
	 * 
	 * 두 정수를 입력 받아서
	 * 나누기의 결과를 double로 돌려줌
	 * 단! y가 0일 땐 안 된다고 출력하고 0을 돌려줌
	 * 
	 * 메소드명: divide
	 * 전달인자: int x, int y
	 * 리턴타입: double
	 * 
	 * @param int x, int y (prpam == 전달인자)
	 * @return double
	 * @author blueat02@naver.com (작성자. 보통 회사메일)
	 */
	
	
	double divide (double x, double y) {
		
		System.out.println("x: " + x);
		System.out.println("y: " + y);
		
		// return 이 흩어져 있으면 보기 힘들 수 있으므로, 이 방법이 제일 나음
		double result = 0;
		
		if (y==0) {
			System.out.println();
			System.out.println("0으로 나눌 수 없습니다.");
			System.out.println();
			result = 0;
		} else {
			System.out.println();
			result = (double)x/y;
		}
		
		System.out.println(result);
		
		return result;
		
		
//		if (y==0) {
//			System.out.println();
//			System.out.println("0으로 나눌 수 없습니다.");
//			System.out.println();
//			return 0; // result 안에 굳이 안 담아도 됨!!
//		} else {
//			System.out.println();
//			return (double)x/y;
//		}
		
//		if (y==0) {
//			System.out.println();
//			System.out.println("0으로 나눌 수 없습니다.");
//			System.out.println();
//			return 0; // return은 break 처럼 그 아래 코딩으로 이어지지 않고 멈춤
//		}
//		
//		return (double)x/y; // default 처럼 이렇게 코딩도 많이 함
		
		
	} // divide end
	
	
	double multiple(double x, double y) {
			
			System.out.println("x: " + x);
			System.out.println("y: " + y);
			
			double result = x * y;
			
			System.out.println(result);
			return result;
		}
	
	double minus(double x, double y) {
		
		System.out.println("x: " + x);
		System.out.println("y: " + y);
		
		double result = x - y;
		
		System.out.println(result);
		return result;
	}
	
	void number() {
		ArrayList nums = new ArrayList();
		
		System.out.println("수식을 입력해주세요");
		
		System.out.print("숫자1(소수 가능): ");
		Scanner scanner = new Scanner(System.in);
		double first = scanner.nextDouble();
		nums.add(first);
		
		System.out.print("연산자(+ || - || * || /): ");
		scanner = new Scanner(System.in);
		String second = scanner.nextLine();
		nums.add(second);
		
		System.out.print("숫자2(소수 가능): ");
		scanner = new Scanner(System.in);
		double third = scanner.nextDouble();
		nums.add(third);
		
		Calc calc = new Calc();
		double a;
		
		if ("+".equals(second)) {
			calc.plus(first, third);
		} else if ("-".equals(second)) {
			calc.minus(first, third);
		} else if ("*".equals(second)) {
			calc.multiple(first, third);
		} else if ("/".equals(second)) {
			calc.divide(first, third);
		} else {
			System.out.println("잘못된 연산자입니다.");
		}
		
	}
	
	
	
	
} // Calc end
