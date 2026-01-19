package chap05;

import java.util.Scanner;

public class _ArrayDimPractice_03_1 {
	public static void main(String[] args) {
		
		System.out.println("---- 문제 7 ----");
		
		/* 문제 7
		 * {3, 4, 7, 5, 1, 4, 6}
		 * 두번째 큰 수 찾기
		 */
		
		int[] a7 = {3, 4, 7, 5, 1, 4, 6};
		int max = a7[0];
		int second = a7[0];
		for (int i = 0 ; i<a7.length; i++) {
			if (max<a7[i]) {
				max = a7[i];
			}
		}
		
		for (int i=0; i<a7.length; i++) {
			if (max>a7[i] && second<a7[i]) {
				second = a7[i];
			}
		}
		
		System.out.println("두번째로 큰 수 : " + second);
		System.out.println();
		
		
		
		
		System.out.println("---- 문제 8 ----");
		
		/* 문제 8
		 * 오른쪽으로 한 칸씩 밀기 (왼쪽은 0으로 채우기)
		 * {3, 4, 7, 5, 1, 4, 6}
		 * {0, 3, 4, 7, 5, 1, 4}
		 * {0, 0, 3, 4, 7, 5, 1}
		 */
		
		
		int[] a8_1 = {3, 4, 7, 5, 1, 4, 6};
		int[][] a8 = new int [a8_1.length+1][a8_1.length];

//		for (int i=0; i<a8_1.length; i++) {
//			for (int j=i; j<a8_1.length; j++) {
//				a8[i][j] = j;
//			}
//		}
		
		a8[0] = new int[] {3, 4, 7, 5, 1, 4, 6};
		
		for (int j=0; j<a8.length-1; j++) {
			for (int i=a8[j].length-1; i>0; i--) {
				a8[j+1][i] = a8[j][i-1];
			}
		}
		
		for (int i=0; i<a8.length; i++) {
			for (int j=0; j<a8[i].length; j++) {
				System.out.printf("a8[%d][%d]: %d   ", i, j, a8[i][j]);
			}
			System.out.println();
		}
		
		System.out.println();
		
		
		
		System.out.println("---- 문제 9 ----");
		
		/* 문제 9
		 * 오른쪽으로 한 칸씩 밀기
		 * {3, 4, 7, 5, 1, 4, 6}
		 * {6, 3, 4, 7, 5, 1, 4}
		 * {4, 6, 3, 4, 7, 5, 1}
		 */
		
		int[] a9_1 = {3, 4, 7, 5, 1, 4, 6};
		int[][] a9 = new int [a9_1.length+1][a9_1.length];

		for (int i=0; i<a9_1.length; i++) {
			for (int j=0; j<a9_1.length; j++) {
				a9[i][j] = j;
			}
		}
		
		a9[0] = new int[] {3, 4, 7, 5, 1, 4, 6};
		
		for (int j=0; j<a9.length-1; j++) {
			for (int i=a9[j].length-1; i>0; i--) {
				a9[j+1][i] = a9[j][i-1];
			}
			for (int k=0; k<=j; k++) {
				a9[j+1][k] = a9[0][6-(j-k)];
			}
		}
		
		for (int i=0; i<a9.length; i++) {
			for (int j=0; j<a9[i].length; j++) {
				System.out.printf("a9[%d][%d]: %d   ", i, j, a9[i][j]);
			}
			System.out.println();
		}
		System.out.println();
		
		
		
		
		/* 문제 10
		 * 임시 비밀번호 8자리
		 * 10-1. 숫자만
		 * 10-2. 소문자만
		 * 10-3. 숫자 2개 이상, 대/소문자 각 1개 이상
		 */
		System.out.println("---- 문제 10-1 ----");
		
		int[] a10 = new int[8];
		
		System.out.print("비밀번호: " );
		for (int i=0; i<a10.length; i++) {
			a10[i] = (int) ((Math.random()*9)+1);
			System.out.print(a10[i] + " ");
		}
		System.out.println();
		
		System.out.println();
		
		
		System.out.println("---- 문제 10-2 ----");
		
		char[] a10_2 = new char[8];
		
		System.out.print("비밀번호: " );
		for (int i=0; i<a10_2.length; i++) {
			a10_2[i] = (char)((Math.random()*26)+97);
			System.out.print(a10_2[i] + " ");
		}
		System.out.println();
		
		
		System.out.println();
		
		
		System.out.println("---- 문제 10-3 ----");
		
		int[] pwForm = new int [8];
		int count0 = 0;
		int count1 = 0;
		int count2 = 0;
		
		boolean stop = true;
		
		do {
			count0 = 0;
			count1 = 0;
			count2 = 0;
			
			for (int i=0; i<pwForm.length; i++) {
				pwForm[i] = (int)((Math.random())*3);
				
				if (pwForm[i] == 0) {
					count0++;
				} else if (pwForm[i] == 1) {
					count1++;
				} else {
					count2++;
				}
			}
			
			if (count0 >= 2 && count1 >= 1 && count2 >= 1) {
				stop = false;
			}
			
		} while (stop);
		
		// pwForm 확인용
//		for (int i=0; i<pwForm.length; i++) {
//			System.out.print(pwForm[i] + " ");
//		}
//		System.out.println();
		
		char[] pw = new char[8];
		
		for (int i=0; i<pw.length; i++) {
			if (pwForm[i] == 0) {
				pw[i] = (char)((Math.random()*10)+48);
			} else if (pwForm[i] == 1) {
				pw[i] = (char)((Math.random()*26)+65);
			} else {
				pw[i] = (char)((Math.random()*26)+97);
			}
		}
		
		for (int i=0; i<pw.length; i++) {
			System.out.print(pw[i] + " ");
		}
		System.out.println();
		
		
		System.out.println();
		
		System.out.println("---- 문제 11 ----");
		
		/* 문제 11
		 * 자리가 10개 있는 소극장의 예약 시스템
		 * 자리 번호는 1~10번까지 번호의 자리
		 * 메뉴: 1. 예약, 2. 좌석현황(차있는 거, 비어있는 거), 3. 잔여좌석(비어있는 거)
		 * 
		 * 조건1. 예약이 가능하다면, "n번 자리 예매에 성공하였습니다."
		 * 조건2. 이미 선택된 좌석입니다.
		 */
		
		int[] a11 = new int[10];
		for (int i=0; i<a11.length; i++) {
			a11[i] = i+1;
		}
		boolean[] a11Fin = new boolean[10];
		
		int menu = 0;
		do {
			System.out.println("--------------- 메뉴 ---------------");
			System.out.println("1. 예약 | 2. 좌석현황 | 3. 잔여좌석 | 4. 종료");
			System.out.println("------------------------------------");
			
			System.out.print("메뉴를 입력해주세요: ");
			Scanner scan11 = new Scanner(System.in);
			menu = scan11.nextInt();
			System.out.println();
			
			if (menu==1) {
				boolean seat = true;
				
				while (seat) {
					System.out.println("1~10번까지 예약하실 좌석 번호를 입력해주세요");
					System.out.print("좌석 번호: ");
					Scanner scanResv = new Scanner(System.in);
					int resv = scanResv.nextInt();
					System.out.println();
					
					if (resv<1 || resv>10) {
						System.out.println("잘못된 좌석 번호입니다. 1~10번까지 입력해주세요.");
						System.out.println();
					} else {
						
						
						for (int i=0; i<a11Fin.length; i++) {
							
							if (resv-1 == i && a11Fin[i] == true) {
								System.out.println("이미 선택된 좌석입니다.");
								System.out.println();
								break;
							} else if (resv-1 == i && a11Fin[i] != true) {
								System.out.println(resv + "번 좌석 예매에 성공하였습니다.");
								System.out.println();
								a11Fin[i] = true;
								seat = false;
								break;
							}
							
						} // a11Fin i end
						
					} // resv if end
				}
			} // menu1 if end
			else if (menu==2) {
				for (int i=0; i<a11Fin.length; i++) {
					if (a11Fin[i] == true) {
						System.out.printf("%d번 좌석: 예매 완료", i+1);
						System.out.println();
					} else {
						System.out.printf("%d번 좌석: 예매 가능", i+1);
						System.out.println();
					}
				} // menu2 for end
				System.out.println();
			} // menu2 if end
			else if (menu==3) {
				int count = 0;
				System.out.println("<잔여좌석 현황>");
				for (int i=0; i<a11Fin.length; i++) {
					if (a11Fin[i] != true) {
						System.out.printf("%d번 좌석 ", i+1);
						System.out.println();
						count++;
					}
				}
				System.out.println();
				System.out.println("총 예매가능 좌석 수: " + count);
				System.out.println();
			} // menu3 if end
			else if (menu==4) {
				System.out.println("종료합니다.");
			}
			else {
				System.out.println("잘못된 메뉴입니다. 메뉴를 다시 선택해주세요.");
				System.out.println();
			}
			
		} while (menu != 4);
		
		
		
		System.out.println();
		
		System.out.println("---- 문제 12 ----");
		
		/* 문제 12
		 * 로또 번호 6개 배열에 저장
		 * 단, 중복 없이!
		 */
		
		int[] lotto = new int[6]; // 로또 번호 6개 뽑을 예정
		
		for (int i=0; i<lotto.length;) { // 6번 반복해서 숫자 뽑을 예정
			int lot = (int)((Math.random()*45)+1); // 랜덤 숫자 뽑음
			
			boolean jStop = false;
			for (int j=0; j<i && jStop == false; j++) { // 앞선 숫자와 비교
					if (lot == lotto[j]) { // 앞선 숫자들과 같을 때
						jStop = true; // j 반복 스탑, while 스탑
						break; // if 스탑
					} else {
						jStop = false;
					}// j if end
 			} // j end
			
			if (jStop == false) {
				lotto[i] = lot;
				i++;
			}
		} // i end
		
		
		for (int i=0; i<lotto.length; i++) { // 로또 번호 출력
			System.out.print(lotto[i] + " ");
		}
		System.out.println();
		
		
		
		System.out.println();
		
		/* 문제 13
		 * 2차원 배열의 주차장, 4개의 주차 자리
		 * 
		 * 0: 이미 주차
		 * 1: 주차 안 됨
		 * {
		 * 		{0, 0, 0, 0} // 1층
		 * 		{0, 0, 0, 1}
		 * 		{0, 0, 1, 0}
		 * 		{1, 0, 1, 1}
		 * 		{1, 1, 1, 1} // 5층
		 * }
		 * 
		 * 13-1. 2층에 주차된 차량 수 출력
		 * 13-2. 전체 남은 자리 수
		 */
		
		int[][] parking = { //[5][4]
				  		{0, 0, 0, 0}, // 1층
				  		{0, 0, 0, 1},
				  		{0, 0, 1, 0},
				  		{1, 0, 1, 1},
				 		{1, 1, 1, 1} // 5층
				  };
		
		System.out.println("---- 문제 13-1 ----");
		
		int floor = 2; // 몇 층 조사?
		
		int count = 0; // 주차된 차량 수
		for (int i=0; i<parking[floor-1].length; i++) {
			if (parking[floor-1][i] == 0) {
				count++;
			}
		} // i end
		System.out.printf("%d층에 주차된 차량 수: %d", floor, count);
		System.out.println();
		
		int empty = (parking[floor-1].length)-count;
		System.out.printf("%d층에 빈 자리 수: %d", floor, empty);
		System.out.println();
		
		System.out.println();
		
		
		
		System.out.println("---- 문제 13-2 ----");
		
		
		int empty2 = 0;
		for (int i=0; i<parking.length; i++) {
			for (int j=0; j<parking[i].length; j++) {
				if (parking[i][j] == 1) {
					empty2++;
				}
			} // j end
		} // i end
		System.out.printf("전체 층 빈 자리 수: %d", empty2);
		System.out.println();
		
		System.out.println();
		
		
		
		
	} // end
} // end
