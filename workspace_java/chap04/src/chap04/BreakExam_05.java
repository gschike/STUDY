package chap04;

import java.util.Scanner;

public class BreakExam_05 {

	public static void main(String[] args) {
		
		
//		System.out.println("--- 주사위 6 나올 때까지 ---");
//		int fin = 6; // 주사위 몇 뽑을래?
//		int cnt = 0;
//		while (true) {
//			int num = (int)((Math.random()*6)+1);
//			System.out.println(num);
//			cnt++; // 6 나온 것도 포함
//			
//			if (num==fin) {
//				break;
//			} // if
//		
////			cnt++; // 6 나온 것 미포함
//		} // while
//		System.out.println("총 몇 번? " + cnt);
//		
//		
//		/* 문제 1
//		 * 총 5명이 순차적으로 주사위를 던져서
//		 * 각자 6이 나올 때까지
//		 * 6이 나오면 다음 사람
//		 * for문이 좋겠지...
//		 */
//		
//		int count = 0;
//		int finish = 6;
//		for (int i=1; i<=5; i++) {
//			int countI=0;
//			System.out.println(i + "실행: ");
//			while (true) {
//				int num = (int)((Math.random()*6)+1);
//				System.out.print(num + " ");
//				count++;
//				countI++;
//				if (num==finish) {
//					break; // while만 중단
//				} // if
//			} // while
//			System.out.println();
//			System.out.println(i + "몇 번? " + countI);
//		} // for
//		System.out.println("총 몇 번? " + count);
//		
//		
//		
//		/* 문제 2
//		 * 총 4층의 주차건물
//		 * 각 층에는 10대의 자리가 있음
//		 * 내 차는 1층 첫번째부터 17번째에 위치함
//		 * 예를 들기 애매해서....
//		 * 총 17번째 자리가 비어있음
//		 */
//		
//		int count2 = 0;
//		boolean flag = false;
//		for (int i = 1; i<=4; i++) {
//			
//			for (int j = 1; j<=10; j++) {
//				count2++;
//				System.out.println(i + ", " + j);
//				if (count2 == 17) {
//					System.out.println("!!!!!!!");
//					flag = true;
//					break;
//				} // if end
//			} // for j end
//			
//			if (flag == true) { // boolean falg 를 활용하여 바깥쪽도 break
//				break;
//			} // if i end
//			
//		} // for i end
//		
//		
//		// continue 사용해서 짝수만 출력.
//		// continue : 이번 반복은 나가리, 다음 반복으로 넘어감
//		for (int i=1; i<=10; i++) {
//			if (i%2 != 0) {
//				continue;
//			}
//			System.out.println(i);
//		}
		
		
		
		/* 키보드로 입력된 데이터로 예금, 출금, 조회, 종료 기능을 제공
		 * 메뉴 외에 선택하지 않게
		 * 예금액이 마이너스 되지 않게
		 * 출금액이 마이너스 되지 않고, 잔고 넘지 않게
		 */
		
		int balance = 10000;
		boolean run = true;
		
		System.out.println();
		while (run) {
			System.out.println("-------------- 메뉴 ---------------");
			System.out.println("1.예금 | 2.출금 | 3.잔고 | 4. 종료");
			System.out.println("-----------------------------------");
			System.out.print("선택> ");
			Scanner scan = new Scanner(System.in);
			int select = scan.nextInt();
			System.out.println();
			
			if (select==1) {
				boolean yFlag = true;
				while (yFlag) {
					System.out.print("예금액> ");
					scan = new Scanner(System.in);
					int y = scan.nextInt();
					System.out.println();
					
					if (y<0) {
						System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
						System.out.println();
					} else {
						balance += y;
						System.out.println("예금 입금을 완료하였습니다.");
						System.out.printf("잔고> " + balance);
						System.out.println();
						System.out.println();
						yFlag = false;
					} // y if end
				} // yFlag while end
			} // select if y end
			else if (select == 2) {
				boolean cFlag = true;
				while (cFlag) {
					System.out.print("출금액> ");
					scan = new Scanner(System.in);
					int c = scan.nextInt();
					System.out.println();
					
					if (c<0) {
						System.out.println("잘못 입력하셨습니다. 다시 입력해주세요.");
						System.out.println();
					} else if (c>balance) {
						System.out.println("잔액이 부족합니다. 현재 잔고는 " + balance + "원 입니다.");
						System.out.println();
					} else {
						balance -= c;
						System.out.println("출금을 완료하였습니다.");
						System.out.printf("잔고> " + balance);
						System.out.println();
						System.out.println();
						cFlag = false;
					} // c if end
				} // cFlag end
			} // select if c end
			else if (select == 3) {
				System.out.println("잔고> " + balance);
				System.out.println();
			}
			else if (select == 4) {
				System.out.println("종료합니다.");
				run = false;
			}
			else {
				System.out.println("메뉴에 없는 항목입니다. 다시 입력해주세요.");
				System.out.println();
			}
		} // run while end
		
		
		
//		int menu = -1;
//		int balance2 = 0;
//		do {
//			System.out.println("-------------- 메뉴 ---------------");
//			System.out.println("1.예금 | 2.출금 | 3.잔고 | 4. 종료");
//			System.out.println("-----------------------------------");
//			System.out.println();
//			
//			System.out.print("메뉴를 입력하세요: ");
//			Scanner scan = new Scanner(System.in);
//			menu = scan.nextInt(); // 메뉴 입력
//			System.out.println();
//			
//			if (menu==1) {
//				System.out.print("입금액: ");
//				Scanner scan2 = new Scanner(System.in);
//				int money = scan2.nextInt(); // 메뉴 입력
//				System.out.println();
//				
//				if (money<0) {
//					System.out.println("입금액을 확인해주세요.");
//				} else {
//					balance2 += money;
//				}
//			} // menu if
//			else if (menu==2) {
//				System.out.print("출금액: ");
//				Scanner scan2 = new Scanner(System.in);
//				int money = scan2.nextInt(); // 메뉴 입력
//				
//				if (money<0) {
//					System.out.println("입금액을 확인해주세요.");
//				} else if (balance2 < money) {
//					System.out.println("잔액이 부족합니다.");
//				} else {
//					balance2 -= money;
//				}
//			}
//			else if (menu==3) {
//				System.out.println("잔액: " + balance2);
//			}
//			else if (menu==4) {
//				System.out.println("종료합니다.");
//			}
//			else {
//				System.out.println("메뉴를 다시 확인해주세요.");
//			}
//		} while (menu != 4);
		
		
		
	} // end
} // end
