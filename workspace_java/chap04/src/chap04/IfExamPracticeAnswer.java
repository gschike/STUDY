package chap04;

import java.util.Scanner;

public class IfExamPracticeAnswer {

	public static void main(String[] args) {
		
		
		/* 문제8
		 * 임의의 수를 입력받아서 다음과 같이 출력
		 * 예 : 125
		 * 입력한 수는 100보다 크고, 양수이고, 홀수입니다.
		 */
		System.out.println("8번. 임의의 수를 입력받아 100보다 큰지, 양수인지, 홀수인지");
		
		System.out.print("number: ");
		// 스캐너 선언, int 값 바로 받기
		Scanner sNum8 = new Scanner(System.in);
		int num8 = sNum8.nextInt();
		
		// 변동되는 값 변수로 선언
		String big;
		String minus;
		String odd;
		
		if (num8>100) {
			big = "크";
		} else {
			big = "작";
		}
		if (num8>=0) {
			minus = "양수";
		} else {
			minus = "음수";
		}
		if (num8%2==0) {
			odd = "짝수";
		} else {
			odd = "홀수";
		}
		
		// 반복되는 구문을 고정해놓고, 변동되는 값은 변수로 처리
		System.out.printf("입력한 수는 100보다 %s고, %s이고, %s입니다.", big, minus, odd);
		System.out.println();
		System.out.println();
		
		
//		sNum8 = new Scanner(System.in); // 스캐너 선언 안 하고 재활용 가능!
		
		
		
		/* 문제9
		 * 온도를 입력 받아서 다음과 같이 출력
		 * 예 : -3
		 * 영하 3도 입니다
		 * 예 : 5
		 * 영상 5도 입니다
		 */
		System.out.println("9번. 온도를 입력 받아서 출력");
		
		System.out.print("number: ");
		Scanner sNum9 = new Scanner(System.in);
		int num9 = sNum9.nextInt();
		
		if (num9<0) {
			System.out.print("영하 ");
			num9 = num9*(-1);
		} else if (num9>0) {
			System.out.print("영상 ");
		} else {
			System.out.print("");
		}
		System.out.print(num9 + "도 입니다");
		
		System.out.println();
		System.out.println();
		
		
		
	} //

}
