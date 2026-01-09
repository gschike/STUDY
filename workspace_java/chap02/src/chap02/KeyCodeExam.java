package chap02;

import java.util.Scanner;

public class KeyCodeExam {

	public static void main(String[] args) {
		
		System.out.println(1); // ln은 다음 줄에 영향을 미침
		System.out.println(2);
		
		System.out.print(3); // 2 다음 줄에 나옴
		System.out.print(4);
		System.out.println(5); // 345 붙어서 나옴
		
		System.out.println(); // 아무것도 안 치면 <br>처럼 그냥 엔터 처리됨
		System.out.println(6);
		
		// printf : "형식1, 형식2...", 내용1, 내용2...
		// s: 문자열, d: 정수(int, short, long 등), f: 실수(double, float 등)
		System.out.printf("이름: %s, 나이: %d", "김자바", 25);
		System.out.println("    ---"); // print처럼 엔터 처리 안 됨
		System.out.printf("이름: %s, 나이: %d\n", "김자바", 25); // \n 으로 엔터 처리
		System.out.println("    ---");
		
		System.out.println();
		System.out.println("-----------------------------");
		
		
		
		
		
		
		///////////////////////////////////////////////////
		// 입력
		// try에서 예외가 발생해도 넘어갈 수 있게 해줌
		int keyCode;
//		System.in.read();
		// system.in.read (); 하면 빨간줄 > surround with try/catch
		
		// Scanner 연습하려고 주석 처리함
/*
		try {
			keyCode = System.in.read();
			System.out.println("keyCode: " + keyCode);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
*/
		// 이클립스 단축키
		/*
		 * 한 줄 지우기 : ctrl + D 
		 * 한 줄 복사 : alt + ctrl + 위아래 방향키
		 * 한 줄 움직이기 : alt + 위아래 방향키
		 * 주석 단축키 : ctrl + /
		 * 자동 정렬 : ctrl + shift + f // 근데 주석이 합쳐지고 좀 별로임
		 * 자동 import : ctrl + shift + o
		 */
		
		Scanner scanner = new Scanner(System.in);
//		// 엔터까지의 모든 글씨
//		String inputData = scanner.nextLine();
//		System.out.println("inputData: "+ inputData);
//		
//		// next는 엔터쳤을 때, 첫번째 띄어쓰기 전까지만
//		inputData = scanner.next();
//		System.out.println("inputData: "+ inputData);
//		
//		System.out.println();
//		System.out.println("------------------------");
//		System.out.println();
//		
		
		// 문제
		// 나이를 입력하고, +1 해서 출력
		
//		int age = 25;
//		System.out.printf("올해 나이: %d, 내년 나이: %d", age, age+1);
		
		System.out.print("나이를 입력하세요");
		
//		String age11 = scanner.nextLine();
//		int age22 = Integer.parseInt(age11);
//		System.out.println("내년엔 " + (age22 + 1) + "살 입니다.");
		
		int age3 = scanner.nextInt();
		System.out.println("내년엔 " + (age3 + 1) + "살 입니다.");
		
	}

}
