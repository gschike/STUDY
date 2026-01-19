package chap04;

import java.util.Scanner;

public class WhileExam_04 {

	public static void main(String[] args) {
		
		int i=1;
		
		while (i<=10) {
			System.out.print(i + " ");
			i++; // i++가 먼저 가면 값이 달라짐. 순서 중요할 듯
		}
		System.out.println();
		System.out.println("---------------");
		System.out.println();
		
//		System.out.println("1: 커피, 2: 차, 0: 종료");
//		
//		System.out.print("메뉴를 고르세요: ");
//		Scanner scan = new Scanner(System.in);
//		int menu = scan.nextInt();
//		
//		
//		if (menu==1) {
//			System.out.println("커피 드릴게요.");
//		} else if (menu==2) {
//			System.out.println("차 드릴게요.");
//		} else if (menu==0) {
//			System.out.println("종료합니다.");
//		} else {
//			System.out.println("다시 입력해주세요.");
//		}
		
		
		int menu = -1;
		while (menu!=0) {
			System.out.println("1: 커피, 2: 차, 0: 종료");
			
			System.out.print("메뉴를 고르세요: ");
			Scanner scan = new Scanner(System.in);
			menu = scan.nextInt();
			
			if (menu==1) {
				System.out.println("커피 드릴게요.");
			} else if (menu==2) {
				System.out.println("차 드릴게요.");
			} else if (menu==0) {
				System.out.println("종료합니다.");
			} else {
				System.out.println("다시 입력해주세요.");
			}
		}
		
		menu= -1;
		do { // just do it. 무조건 한 번 실행
			System.out.println("1: 커피, 2: 차, 0: 종료");
			
			System.out.print("메뉴를 고르세요: ");
			Scanner scan = new Scanner(System.in);
			menu = scan.nextInt();
			
			if (menu==1) {
				System.out.println("커피 드릴게요.");
			} else if (menu==2) {
				System.out.println("차 드릴게요.");
			} else if (menu==0) {
				System.out.println("종료합니다.");
			} else {
				System.out.println("다시 입력해주세요.");
			}
		} while (menu!=0);
		
		
		menu=-1;
		for (; menu!=0;) {
			System.out.println("1: 커피, 2: 차, 0: 종료");
			
			System.out.print("메뉴를 고르세요: ");
			Scanner scan = new Scanner(System.in);
			menu = scan.nextInt();
			
			if (menu==1) {
				System.out.println("커피 드릴게요.");
			} else if (menu==2) {
				System.out.println("차 드릴게요.");
			} else if (menu==0) {
				System.out.println("종료합니다.");
			} else {
				System.out.println("다시 입력해주세요.");
			}
			
		}
		
		
		// for문 초기화, 증감식에  scan
//		Scanner scan = new Scanner(System.in);
//		menu=-1;
//		for (menu = scan.nextInt(); menu!=0; menu = scan.nextInt()) {
//			System.out.println("1: 커피, 2: 차, 0: 종료");
//			
//			System.out.print("메뉴를 고르세요: ");
//			
//			if (menu==1) {
//				System.out.println("커피 드릴게요.");
//			} else if (menu==2) {
//				System.out.println("차 드릴게요.");
//			} else if (menu==0) {
//				System.out.println("종료합니다.");
//			} else {
//				System.out.println("다시 입력해주세요.");
//			}
//			
//		}
		
		
		
		
		
		
		

	} // end
} // end
