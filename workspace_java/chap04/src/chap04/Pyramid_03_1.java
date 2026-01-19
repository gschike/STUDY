package chap04;

import java.util.Scanner;

public class Pyramid_03_1 {

	public static void main(String[] args) {
		
//		// 1단계 5개 1줄
//		System.out.println("--- 1단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");
//		Scanner scanner = new Scanner(System.in);
//		int height = scanner.nextInt();
//		
//		for (int i=1; i<=height; i++) {
//			System.out.print("+");
//		}
//		System.out.println();
//		
//		System.out.println();
//
//		
//	
//		
//		// 2단계 : +_+_+_+_+_
//		System.out.println("--- 2단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int i=1; i<=height; i++) {
//			System.out.print("+");
//			System.out.print("_");
//		}
//		System.out.println();
//		
//		System.out.println();
//		
//		
//		
//		
//		// 3단계 5개 3줄
//		System.out.println("--- 3단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=1; i<=5; i++) {
//				System.out.print("+");
//			}
//			System.out.println();
//		}
//		System.out.println();
//		
//		System.out.println();
//		
//		/* 4단계
//		 * 11111
//		 * 22222
//		 * 33333
//		 * 44444
//		 * 55555
//		 */
//		System.out.println("--- 4단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=1; i<=height; i++) {
//				System.out.print(j);
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//			
//		/* 5단계
//		 * 1
//		 * 22
//		 * 333
//		 * 4444
//		 * 55555
//		 */
//		System.out.println("--- 5단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=1; i<=j; i++) {
//				System.out.print(j);
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//
//		/* 6단계
//		 * +
//		 * ++
//		 * +++
//		 * ++++
//		 * +++++
//		 */
//		System.out.println("--- 6단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=1; i<=j; i++) {
//				System.out.print("+");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//
//		/* 7단계
//		 * 6단계 반대로
//		 */
//		System.out.println("--- 7단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=height; i>=j; i--) {
//				System.out.print(j);
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		// 수학적으로 계산해서 푸는 방법
//		// 1은 5번 반복 -> 1+5=6
//		// 2는 4번 반복 -> 2+4=6
//		// i는 j번 반복 -> i+j=6; j=6-i
//		
//		for (int i=1; i<=5; i++) {
//			for (int j=1; j<=(5-i+1); j++) {
//				System.out.print(i);
//			}
//			System.out.println();
//		}
//		System.out.println();
//		
//		
//		/* 8단계
//		 * +____
//		 * ++___
//		 * +++__
//		 * ++++_
//		 * +++++
//		 */
//		System.out.println("--- 8단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int i=1; i<=j; i++) {
//				System.out.print("+");
//			}
//			for (int k=height; k>j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//		// if 사용하는 방법
//		for (int j=1; j<=5; j++) {
//			for (int i=1; i<=5; i++) {
//				if (i<=j) {
//					System.out.print("+");
//				} else {
//					System.out.print("_");
//				} // if end
//			} // for i end
//			System.out.println();
//		} // for j end
//		
//		
//		
//		/* 9단계
//		 * 8단계 좌우 반대로
//		 */
//		System.out.println("--- 9단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int k=height; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<=j; i++) {
//				System.out.print("+");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//		/* 10단계
//		 * 피라미드 (왼쪽 공백만)
//		 */
//		System.out.println("--- 10단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int k=height; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<2*j; i++) {
//				System.out.print("+");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//
//		/* 11단계
//		 * 피라미드 (양쪽 공백)
//		 */
//		System.out.println("--- 11단계 ---");
//
//		System.out.print("숫자를 입력해주세요: ");
//		
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		for (int j=1; j<=height; j++) {
//			for (int k=height; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<2*j; i++) {
//				System.out.print("+");
//			}
//			for (int k=height; k>j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//		/* 12단계
//		 * 다이아몬드 (입력받은 줄 수 대로)
//		 */
//		System.out.println("--- 12단계 ---");
//		
//		System.out.print("5 이상의 홀수를 입력해주세요: ");
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		int up = (height/2) +1;
//		int down = height/2;
//		
//		for (int j=1; j<=up; j++) {
//			for (int k=up; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<2*j; i++) {
//				System.out.print("+");
//			}
//			for (int k=up; k>j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		for (int j=down; j>=1; j--) {
//			for (int k=down; k>=j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<2*j; i++) {
//				System.out.print("+");
//			}
//			for (int k=down; k>=j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//		/* 13단계
//		 * 다이아몬드 빈 공간 (입력받은 줄 수 대로)
//		 */
//		System.out.println("--- 13단계 ---");
//		
//		System.out.print("5 이상의 홀수를 입력해주세요: ");
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		up = (height/2) +1;
//		down = height/2;
//		
//		for (int j=1; j<=up; j++) {
//			for (int i=up; i>j; i--) {
//				System.out.print(" ");
//			}
//			System.out.print("+");
//			for (int i=3; i<2*j; i++) {
//				System.out.print(" ");
//			}
//			if (j>1) {
//				System.out.print("+");
//			}
//			for (int i=up; i>j; i--) {
//				System.out.print(" ");
//			}
//			System.out.println();
//		}
//		for (int j=down; j>=1; j--) {
//			for (int i=down; i>=j; i--) {
//				System.out.print(" ");
//			}
//			System.out.print("+");
//			for (int i=3; i<2*j; i++) {
//				System.out.print(" ");
//			}
//			if (j>1 ) {
//				System.out.print("+");
//			}
//			for (int i=down; i>=j; i--) {
//				System.out.print(" ");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		
//		/* 14단계
//		 * 모래시계 (입력받은 줄 수 대로)
//		 */
//		System.out.println("--- 14단계 ---");
//		
//		System.out.print("5 이상의 홀수를 입력해주세요: ");
//		scanner = new Scanner(System.in);
//		height = scanner.nextInt();
//		
//		up = (height/2) +1;
//		down = height/2;
//		
//		for (int j=down; j>=1; j--) {
//			for (int k=down; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=0; i<=2*j; i++) {
//				System.out.print("+");
//			}
//			for (int k=down; k>j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		for (int j=1; j<=up; j++) {
//			for (int k=up; k>j; k--) {
//				System.out.print("-");
//			}
//			for (int i=1; i<2*j; i++) {
//				System.out.print("+");
//			}
//			for (int k=up; k>j; k--) {
//				System.out.print("-");
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		/* 15단계
//		 * 피라미드 if 활용 (입력받은 줄 수 대로, 양쪽 공백)
//		 */
//		System.out.println("--- 15단계 ---");
//		
//		System.out.print("밑 변의 길이를 입력해주세요: ");
//		Scanner sNum = new Scanner(System.in);
//		int num = sNum.nextInt();
//		int half = num/2+1;
//		
//		for ( int i=0; i<=half-1; i++) {
//			for (int j=1; j<=num; j++) {
//				if (j>=half-i && j<=half+i) {
//					System.out.print("+");
//				} else {
//					System.out.print("-");
//				}
//			}
//			System.out.println();
//		}
//
//		/* 16단계
//		 * 피라미드 if 활용 (입력받은 줄 수 대로, 왼쪽 공백만)
//		 */
//		System.out.println("--- 16단계 ---");
//		
//		System.out.print("밑 변의 길이를 입력해주세요: ");
//		Scanner sNum = new Scanner(System.in);
//		int num = sNum.nextInt();
//		int half = num/2+1;
//		
//		for ( int i=0; i<=half-1; i++) {
//			for (int j=1; j<=num; j++) {
//				if (j>=half-i && j<=half+i) {
//					System.out.print("+");
//				} else if (j<half) {
//					System.out.print("-");
//				}
//			}
//			System.out.println();
//		}
//		
//		System.out.println();
//		
//		/* 17단계
//		 * 다이아몬드 if 활용
//		 */
//		System.out.println("--- 17단계 ---");
//		
//		System.out.print("길이를 입력해주세요: ");
//		sNum = new Scanner(System.in);
//		num = sNum.nextInt();
//		int numUp = num/2+1;
//		int numDown = num/2;
//		
//		for (int i=0; i<=numUp-1; i++) {
//			for (int j=1; j<=num; j++) {
//				if (j>=numUp-i && j<=numUp+i) {
//					System.out.print("+");
//				} else {
//					System.out.print("-");
//				}
//			}
//			System.out.println();
//		}
////		for (int i=0; )
		
		
		
	} // end
} // end
