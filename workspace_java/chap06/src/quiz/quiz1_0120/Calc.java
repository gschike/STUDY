package quiz.quiz1_0120;

import java.util.ArrayList;
import java.util.Scanner;

public class Calc {
	
	/** 문제 9 (계산기)
	 * 
	 * 유일한 메소드 calc
	 * 	전달인자 3개 (ArrayList)
	 * 	값1, 연산자, 값2 (3, "-", 2)
	 * 	결과를 return
	 */
	
	ArrayList input = new ArrayList();
	
	double a;
	String operator;
	double b;
	double answer;
	
	void Calc (double a, String operator, double b) {
		this.a = a;
		this.operator = operator;
		this.b = b;
		
		a = 0;
		
		if ("+".equals(this.operator)) {
			
			this.answer = this.a + this.b;
			System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
			System.out.println();
			
			input.add(this.a);
			input.add(this.operator);
			input.add(this.b);
			input.add(this.answer);
			
		} else if ("-".equals(this.operator)) {
			
			this.answer = this.a - this.b;
			System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
			System.out.println();

			input.add(this.a);
			input.add(this.operator);
			input.add(this.b);
			input.add(this.answer);
			
		} else if ("*".equals(this.operator)) {
			
			this.answer = this.a * this.b;
			System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
			System.out.println();

			input.add(this.a);
			input.add(this.operator);
			input.add(this.b);
			input.add(this.answer);
			
		}  else if ("/".equals(this.operator)) {
			
			if (this.b == 0) {
				System.out.println("0으로 나눌 수 없습니다");
				System.out.println();
				String error = "error";

				input.add(this.a);
				input.add(this.operator);
				input.add(this.b);
				input.add(error);
				
			} else {
				this.answer = this.a / this.b;
				System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
				System.out.println();

				input.add(this.a);
				input.add(this.operator);
				input.add(this.b);
				input.add(this.answer);
				
			}
			
		}  else if ("%".equals(this.operator)) {
			
			if (this.b == 0) {
				System.out.println("0으로 나눌 수 없습니다");
				System.out.println();
				String error = "error";

				input.add(this.a);
				input.add(this.operator);
				input.add(this.b);
				input.add(error);
				
			} else {
				this.answer = this.a % this.b;
				System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
				System.out.println();

				input.add(this.a);
				input.add(this.operator);
				input.add(this.b);
				input.add(this.answer);
				
			}
		} else {
			
			System.out.println("연산자는 '+, -, *, /' 만 입력 가능합니다");
			System.out.println();
			String error = "error";

			input.add(this.a);
			input.add(this.operator);
			input.add(this.b);
			input.add(error);
			
		}

		// 통째로 저장하는 방법. 출력할 때도 통째로 출력 가능
//		String log = a + operator + b + "=" + answer;
//		this.input.add(log);
		
	}
	
	
	
	/** 문제 9-1
	 * 계산 했던 로그(히스토리)를 확인하는 메소드 추가
	 */
	
	void log () {
		System.out.println("===== log =====");
		for (int i=0; i<input.size(); i+=4) {
			System.out.println(input.get(i) + " " + input.get(i+1) + " " +  input.get(i+2) + " = " + input.get(i+3));
		}
	}
	
	
	/** Scanner로 식 입력 받기
	 */

//	int power = -1;
//	boolean flag = false;
//	Calc () {
//		
//		System.out.println("1. 계산 | 0. 종료");
//		do {
//			System.out.print("계산하시겠습니까? ");
//			Scanner powerScan = new Scanner(System.in);
//			power = powerScan.nextInt();
//			
//			if (power == 0) {
//				System.out.println("종료합니다");
//				flag = true;
//			} else if (power == 1) {
//				System.out.print("식: ");
//				Scanner scanner = new Scanner(System.in);
//				this.a = scanner.nextDouble();
//				this.operator = scanner.next();
//				this.b = scanner.nextDouble();
//				
//				if ("+".equals(this.operator)) {
//					
//					this.answer = this.a + this.b;
//					System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
//					System.out.println();
//					
//					input.add(this.a);
//					input.add(this.operator);
//					input.add(this.b);
//					input.add(this.answer);
//					
//				} else if ("-".equals(this.operator)) {
//					
//					this.answer = this.a - this.b;
//					System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
//					System.out.println();
//
//					input.add(this.a);
//					input.add(this.operator);
//					input.add(this.b);
//					input.add(this.answer);
//					
//				} else if ("*".equals(this.operator)) {
//					
//					this.answer = this.a * this.b;
//					System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
//					System.out.println();
//
//					input.add(this.a);
//					input.add(this.operator);
//					input.add(this.b);
//					input.add(this.answer);
//					
//				}  else if ("/".equals(this.operator)) {
//					
//					if (this.b == 0) {
//						System.out.println("0으로 나눌 수 없습니다");
//						System.out.println();
//						String error = "error";
//
//						input.add(this.a);
//						input.add(this.operator);
//						input.add(this.b);
//						input.add(error);
//						
//					} else {
//						this.answer = this.a / this.b;
//						System.out.println(this.a + " " + this.operator + " " +  this.b + " = " + this.answer);
//						System.out.println();
//
//						input.add(this.a);
//						input.add(this.operator);
//						input.add(this.b);
//						input.add(this.answer);
//						
//					}
//				} else {
//					
//					System.out.println("연산자는 '+, -, *, /' 만 입력 가능합니다");
//					System.out.println();
//					String error = "error";
//
//					input.add(this.a);
//					input.add(this.operator);
//					input.add(this.b);
//					input.add(error);
//					
//				}
//			} else {
//				System.out.println("잘못된 입력값입니다");
//			}
//			
//		} while (flag == false);
//		
//		
//	} // Calc() end
	
	
	
}
