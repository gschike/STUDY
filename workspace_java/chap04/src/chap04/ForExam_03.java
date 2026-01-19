package chap04;

import java.util.Scanner;

public class ForExam_03 {

	public static void main(String[] args) {
		
		/* 조건식에 여러 개 통합 가능
		 * 
		 * for (int x=3, y=7; x<5; x++, y+=30)
		 */
		
		
		
		
		
		int sum = 0;
		for (int i=1; i<=100; i++) {
			sum += i;
//			sum++; // sum이 1씩 늘어남. 우리가 할 건 i 만큼 늘어나는 거
		} // 1~100 end
		
		System.out.println("1~100의 합: " + sum); // 5050
		
		// for 문 무한반복
		// for (;;) {}
		
//		sum = 0;
//		for (int i=0; i<=100; i+=2) {
//			sum += i;
//		} // 1~100 even end
//		
//		System.out.println("1~100의 짝수의 합: " + sum); // 2550
//		
//		
//		sum = 0;
//		for (int i=1; i<=100; i+=2) {
//			sum += i;
//		} // 1~100 odd end
//		
//		System.out.println("1~100의 홀수의 합: " + sum); // 2500
		
		
		
		
		// 깜짝 퀴즈 : 1~10 출력
		
		for (int i=1; i<=10; i++) {
			System.out.print(i);
		}
		System.out.println();
		
		
		
//		// 1씩 더하는 거 input번 : 1+1+1+1+1
//		System.out.print("1을 몇 번 더할까요?: ");
//		Scanner scanner = new Scanner(System.in);
//		int input = scanner.nextInt();
//		
//		sum = 0;
//		for (int i=1; i<=input; i++) {
//			sum++;
//		}
//		System.out.println("답: " + sum);
		
		
		
		// 1 ~ 5 합
		
		sum = 0;
		for (int i=1; i<=5; i++) {
			sum += i;
		}
		System.out.println(sum);
		
		/* 반복문 만드는 원리
		 * 
		 * 1. 반복되는 것 찾기
		 * 	 : ctrl + c, v 했을 때 바뀌지 않는 것
		 * 
		 * 2. 반복되지 않는 것의
		 * 	2-1. 규칙(패턴) 찾기
		 * 	2-2. 변수로 바꿔서 더 이상 바뀌지 않게 만들기
		 * 
		 * 3. 시작 값 파악
		 * 
		 * 4. 종료 조건 파악
		 */
		
		
		/* 응용 퀴즈 1
		 * 
		 * 구구단 2단 출력하기
		 * 2 x 1 = 2 이런 식으로
		 */
		
		/* 2 * 1 = 2;
		 * 2 * 2 = 4;
		 * 2 * 3 = 6;
		 * 2 * 4 = 8;
		 * 2 * 5 = 10;
		 * 2 * 6 = 12;
		 * 
		 * 반복되는 것 = 2 : base
		 * 
		 * 반복되지 않는 것
		 * 곱하는 수 : i
		 * 
		 * 규칙 : 1씩 증가
		 *   -> i++
		 *   
		 * 시작 값 = 1 : i=1
		 * 종료 조건 : i <= 9
		 * 
		 * base * i = answer
		 */

		
		System.out.println();
		System.out.println("--- 구구단 ---");
		System.out.println();

//		int base = 2; // 2단
		
//		System.out.print("몇 단을 실행할까요? ");
//		Scanner scanner = new Scanner(System.in);
//		int base = scanner.nextInt();
		
		// 랜덤 실행
		int base = (int)(Math.random()*9)+1;
		System.out.println("랜덤: " + base + "단 실행");
		
		
		for (int i=1; i<=9; i++) {
			int answer = base*i; // 식: base * i = answer
			
			System.out.printf("%d x %d = %d", base, i, answer);
			System.out.println();
		}
		
		// 2단 답 모두 더하기
		sum = 0;
		for (int i=1; i<=9; i++) {
			int answer = base*i;
			
			sum += answer;
		}
		System.out.println(base + "단의 총 합은?: " + sum);

		
		//////////////////////////
		
		System.out.println();
		System.out.println("--- 다이아 ---");
		System.out.println();
		
		int i; // 외부에 선언하기 가능
		int n;
		int m;
		int l;
		for (i=0; i<=3; i++) {
			for (n=3; n>i; n--) {
				System.out.print(" ");
			}
			System.out.print("*");
			for (m=1; m<2*i; m++) {
				System.out.print(" ");
			}
			if (i>0) {
				System.out.print("*");
			}
			System.out.println();
		}
		for (i=1; i<=3; i++) {
			for (n=0; n<i; n++) {
				System.out.print(" ");
			}
			System.out.print("*");
			for (m=4; m>=2*i; m--) {
				System.out.print(" ");
			}
			if (i<3) {
				System.out.print("*");
			}
			System.out.println();
		}

		
		System.out.println();
		System.out.println("--- 6이 나올 때까지 주사위 던지기 ---");
		System.out.println();
		
		int finish = 3;
		for (int random = (int)(Math.random()*6)+1 ; random!=finish; random = (int)(Math.random()*6)+1) {
			System.out.printf("%d(이)가 나왔습니다. 다시 시행합니다.", random);
			System.out.println();
		}
		System.out.printf("%d(이)가 나왔습니다. 주사위 던지기를 마칩니다.", finish);
		System.out.println();
		
		
		
		System.out.println();
		System.out.println("--- 10부터 1까지 감소, 짝수만 ---");
		System.out.println();
		
		
		// 10부터 1까지 출력
		
		for (i = 10; i >= 1; i--) {
			System.out.print(i);
		}
		System.out.println();
		
		// 10부터 2까지 짝수만 출력
		for (i = 10; i >= 1; i -= 2) {
			System.out.print(i);
		}
		System.out.println();
		
		
		
		System.out.println();
		System.out.println();

		/* 문제 1
		 * 1~5까지 출력하되, 홀짝 구분해서 출력
		 */
		System.out.println("--- 문제 1. 1~5까지 출력하고, 홀짝 구분해서 출력 ---");
		System.out.println();
		
		for (i=1; i<=5; i++) {
			String odd;
			if (i%2 == 0) {
				odd = "짝수";
			} else {
				odd = "홀수";
			}
			System.out.printf("%d, %s", i, odd);
			System.out.println();
		}
		System.out.println();
		
		
		/* 문제 2
		 * 1부터 100까지 홀수의 합과 개수
		 */
		System.out.println("--- 문제 2. 1~100까지 홀수의 합과 개수 ---");
		System.out.println();
		
		sum = 0;
		int count = 0;
		for (i=1; i<=100; i += 2) {
			sum += i;
			if (i%2 != 0) {
				count++;
			}
		}
		System.out.printf("총합은 %d이고, 홀수는 %d개 입니다", sum, count);
		
		System.out.println();
		System.out.println();
		
		
		
		/* 문제 3
		 * 1부터 입력받은 수까지 더하기
		 */
		System.out.println("--- 문제 3. 1부터 입력받은 수까지 더하기 ---");
		System.out.println();
		
		System.out.print("숫자를 입력해주세요: ");
		Scanner scanner = new Scanner(System.in);
		int input = scanner.nextInt();
		
		if (input<=0) {
			System.out.println("잘못입력하셨습니다. 자연수를 입력해주세요.");
		} else {
			sum = 0;
			for (i=1; i<=input; i++) {
				sum += i;
			}
			System.out.println("1부터 " + input + "까지의 총합: " +sum);
		}
		
		
		System.out.println();
		
		
		/* 문제 4
		 * 1부터 10까지 3개씩 옆으로 찍기
		 * 1 2 3
		 * 4 5 6
		 * 7 8 9
		 * 10
		 */
		System.out.println("--- 문제 4. 1~10까지 3개씩 옆으로 찍기 ---");
		System.out.println();
		
		int fin = 10;
		for (i=1; i<=fin; i++) {
			System.out.print(i);
			if (i%3==0) {
				System.out.println();
			} else {
				System.out.print("\t");
			}
			if (i==fin) {
				System.out.print("끝");
			}
		}
		System.out.println();
		
		
		
		/* 문제 5
		 * 구구단 모든 단 출력
		 */
		System.out.println("--- 문제 5. 구구단 모두 출력 (2중 for문) ---");
		System.out.println();
		
		for (n=2; n<=9; n++) {
			System.out.printf("%d단", n);
			System.out.println();
			for (m=1; m<=9; m++) {
				int answer = n*m;
				System.out.printf("%d x %d = %d", n, m, answer);
				System.out.println();
			}
			System.out.println();
		}
		
		System.out.println();
		
		
		/* 문제 5-2
		 * 구구단 단마다 옆으로 출력
		 */
		System.out.println("--- 문제 5-2. 구구단 옆으로 출력 (2중 for문) ---");
		System.out.println();
		
		for (n=2; n<=9; n++) {
			System.out.printf("%d단\t", n);
			for (m=1; m<=9; m++) {
				int answer = n*m;
				System.out.printf("%dx%d=%d ", n, m, answer);
			}
			System.out.println();
		}
		
		System.out.println();
		
		/* 문제 5-3
		 * 구구단 3단마다 옆으로 출력
		 */
		System.out.println("--- 문제 5-3. 구구단 3단마다 옆으로 출력 (2중 for문) ---");
		System.out.println();
		
//		for (m=1; m<=9; m++) {
//			for (n=2; n<=2+fin-1; n++) {
//				int answer = n*m;
//				System.out.printf("%dx%d=%d ", n, m, answer);
//			}
//			System.out.println();
//		}
//		for (m=1; m<=9; m++) {
//			for (n=5; n<=5+fin-1; n++) {
//				int answer = n*m;
//				System.out.printf("%dx%d=%d ", n, m, answer);
//			}
//			System.out.println();
//		}
//		for (m=1; m<=9; m++) {
//			for (n=8; n<=8+fin-1; n++) {
//				int answer = n*m;
//				System.out.printf("%dx%d=%d ", n, m, answer);
//			}
//			System.out.println();
//		}

		
		finish = 3; // 한 줄에 몇개씩?
		int stop = 9; // 몇단까지?
		for (int start=2; start<=stop; start+=3) {
			for (m=1; m<=9; m++) {
				for (n=start; n<=start+(finish-1) && n<=stop; n++) { // 종료 조건 && 로 연결 가능!!!! 유레카!!!!!!!
					int answer = n*m;
					System.out.printf("%dx%d=%d ", n, m, answer);
				}	// n end
				System.out.println(); // 가로 3줄 엔터
			}	// m end
			System.out.println(); // (start+2)*9 엔터
		}	// start end
		
		
		// 하나씩, 하나씩 반복 찾기
		
		for (int j=2; j<=9; j+=3) {
			for (int g=1; g<=9; g++) {
				for (int h=j; h<=j+finish-1; h++) {
					int answer = h*g;
					if (h<=9) {
						System.out.printf("%dx%d=%d ", h, g, answer);
					}
				}
				System.out.println();
			}
			System.out.println();
		}

		
	
		
		
		/* 문제 6
		 * 주사위 2개 굴려서 나올 수 있는 모든 조합
		 */
		System.out.println("--- 문제 6. 주사위 2개 모든 조합 ---");
		System.out.println();
		
		for (int dice1=1; dice1<=6; dice1++) {
			for (int dice2=1; dice2<=6; dice2++) {
				System.out.printf("[%d, %d]", dice2, dice1);
			}
			System.out.println();
		}
		
		System.out.println();

		
		
		/* 문제 7
		 * 주사위 2개 굴려서 합 별로 출력
		 *
		 */
		System.out.println("--- 문제 7. 주사위 2개 굴려서 합 별로 출력 ---");
		System.out.println();
		
		// 비효율적인 방법이긴 함. 합 2를 구하기 위해서 36번씩 돌아서, 도합 400번 이상 돌아감
		for (i=2; i<=12; i++) { // 합이 1부터 12까지
			System.out.println("두 주사위의 합이 " + i + "일 때");
			for (int dice1=1; dice1<=6; dice1++) { // 주사위1 1부터 6까지
				for (int dice2=1; dice2<=6; dice2++) { // 주사위2 1부터 6까지
					sum = dice1 + dice2; // 두 주사위의 합
					if (sum == i) {
						System.out.printf("[%d, %d] ", dice1, dice2);
					} // if end
				} // dice2 end
			} // dice1 end
			System.out.println();
		} // i end
		
		System.out.println();
		
		
		
		/* 문제 8
		 * 주사위 2개 굴려서 나오는 조합의 중복 제거하고 출력
		 */
		System.out.println("--- 문제 8. 주사위 2개 조합, 중복 제거 ---");
		System.out.println();
		
//		for (i=2; i<=12; i++) { // 합이 2부터 12까지
//			System.out.println("두 주사위의 합이 " + i + "일 때");
//			for (int dice1=1; dice1<=6; dice1++) { // 주사위1 1부터 6까지
//				for (int dice2=dice1; dice2<=6; dice2++) { // 주사위2 주사위1부터 6까지
//					sum = dice1 + dice2; // 두 주사위의 합
//					if (sum == i) {
//						System.out.printf("[%d, %d] ", dice1, dice2);
//					} // if end
//				} // dice2 end
//			} // dice1 end
//			System.out.println();
//		} // i end
//		
//		System.out.println();
		
		
		for (int dice1=1; dice1<=6; dice1++) {
			for (int dice2=dice1; dice2<=6; dice2++) {
				System.out.printf("[%d, %d]", dice1, dice2);
			}
			System.out.println();
		}
		
		System.out.println();

		
		
		/* 문제 9
		 * 피라미드 만들기
		 */
		System.out.println("--- 문제 9. 피라미드 ---");
		System.out.println();
		
		for (i=1; i<=4; i++) {
			for (n=3; n>=i; n--) {
				System.out.print("-");
			} // n end (left)
			for (m=1; m<2*i; m++) {
				System.out.print("*");
			} // m end
//			for (l=6; l>=2*i; l--) {
//				System.out.print("-");
//			} // l end (right)
//			for (m=1; m<2*i&&m<7; m++) {
//				System.out.print("*");
			} // m end
			
			System.out.println();
		} // i end
		
		System.out.println();

		
		/* 문제 10
		 * border 만들기
		 */
		System.out.println("--- 문제 10. border ---");
		System.out.println();
		
		System.out.print("border: ");
		Scanner sBorder = new Scanner(System.in);
		int border = sBorder.nextInt();
		
		for (i=1; i<=border; i++) { // 위에 한 줄
			System.out.print("*");
		} 
		System.out.println();
		for (n=3; n<=border; n++) {
			System.out.print("*");
			for (m=1; m<=border-2; m++) {
				System.out.print(" ");
			} // m end (space)
			System.out.print("*");
			System.out.println();
		} // n end
		if (border>=2) {
			for (i=1; i<=border; i++) { // 밑에 한 줄
				System.out.print("*");
			} 
		}
		
		
		
		System.out.println();
		
		
		
		System.out.println();
		System.out.println("--- 로또 중복 없이 ---");
		System.out.println();

		// 희안하게 중복만 나오게 만들어버림
//		int random = (int)((Math.random()*45)+1);
//		for (i=1; i<=5;) {
//			int random2 = (int)((Math.random()*45)+1);
//			if (random2 != random) {
//				i += 1;
//				System.out.print(random + " ");
//			}
//		}
		
//		int random = (int)((Math.random()*45)+1);
//		for (i=1; i<=5;) {
//			int random2 = (int)((Math.random()*45)+1);
//			if (random2 != random) {
//				i += 1;
//				System.out.print(random + " " + random2 + " ");
//			}
//		}
		
//		for (i=1; i<=6;) {
//			int random1 = (int)((Math.random()*45)+1);
//			int random2 = 0;
//			int random3 = 0;
//			int random4 = 0;
//			int random5 = 0;
//			int random6 = 0;
//			if (random1 != random2 && random1 != random3 && random1 != random4 && random1 != random5 && random1 != random6 &&
//					random2 != random3 && random2 != random4 && random2 != random5 && random2 != random6 && 
//					random3 != random4 && random3 != random5 && random3 != random6 && 
//					random4 != random5 && random4 != random6 && 
//					random5 != random6 ) {
//				random2 = (int)((Math.random()*45)+1);
//				System.out.print(random2 + " ");
//				i++;
//			}
//		}
		
		
		
//		int random1 = (int)((Math.random()*45)+1);
//		System.out.print(random1 + " ");
//		System.out.println();
//		
//		
//		i = 1;
//		for (i=1; i<6;) {
//			int random2 = (int)((Math.random()*45)+1);
//			if (random2 != random1) {
//				i++;
//				System.out.print(random2 + " ");
//			}
//			
//			int random3 = (int)((Math.random()*45)+1);
//			if (random3 != random1 && random3 != random2) {
//				i++;
//				System.out.print(random3 + " ");
//			}
//			
//			int random4 = (int)((Math.random()*45)+1);
//			if (random4 != random1 && random4 != random2 && random4 != random3) {
//				i++;
//				System.out.print(random4 + " ");
//			}
//			
//			int random5 = (int)((Math.random()*45)+1);
//			if (random5 != random1 && random5 != random2 && random5 != random3 && random5 != random4) {
//				i++;
//				System.out.print(random5 + " ");
//			}
//			
//			int random6 = (int)((Math.random()*45)+1);
//			if (random6 != random1 && random6 != random2 && random6 != random3 && random6 != random4 && random6 != random5) {
//				i++;
//				System.out.print(random6 + " ");
//			}
//		} // lotto end
		

		int random1 = (int)((Math.random()*45)+1); // random1 고정
		System.out.println("random1: " + random1);
		int random2 = 0;
		int random3 = 0;
		int random4 = 0;
		int random5 = 0;
		int random6 = 0;
		
		for (i=1; i<6;) {
			int random = (int)((Math.random()*45)+1); // random으로 뽑기
			if (i==1  && random != random1) { // 첫번째 뽑은, 랜덤이 랜덤1과 다를 때
				random2 = random; // 랜덤2에 랜덤 덮어쓰고
				i++; // 순서 넘어가기
				System.out.println("random2: " + random2); // 랜덤 2 출력
			}
			if (i==2 && random != random1 && random != random2) { // 두번째 뽑은, 랜덤이랜덤 1과 랜덤2와 다를 때
				random3 = random;
				i++;
				System.out.println("random3: " + random3);
			}
			if (i==3 && random != random1 && random != random2 && random != random3) {
				random4 = random;
				i++;
				System.out.println("random4: " + random4);
			}
			if (i==4 && random != random1 && random != random2 && random != random3 && random != random4) {
				random5 = random;
				i++;
				System.out.println("random5: " + random5);
			}
			if (i==5 && random != random1 && random != random2 && random != random3 && random != random4 && random != random5) {
				random6 = random;
				i++;
				System.out.println("random6: " + random6);
			}
		}
		
		
		
		
	} // end

}
