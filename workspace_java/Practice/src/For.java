import java.util.Scanner;

public class For {

	public static void main(String[] args) {
		
		
		/* 문제 1. 대각선 기준 별 패턴
		 * 정수 n을 입력 받아, 다음과 같은 형태를 출력
		 * 단, n>=5이며, 홀수여야 함
		 */
		
		System.out.println("--- 문제1. 대각선 패턴 ---");
		System.out.println();
		
		System.out.print("5 이상의 홀수를 입력하세요: ");
		Scanner scanner = new Scanner(System.in);
		int n = scanner.nextInt();
		int up = (n+1)/2;
		int down = n/2;
		
		if (n<5 || n%2 == 0) {
			System.out.println("잘못된 값입니다. 다시 입력하세요.");
		} else {
			
			for (int i = 1; i <= up; i++) {
//				System.out.print(i + ": ");
				for (int m = 1; m< i; m++) {
					System.out.print("-");
				}
				System.out.print("*");
				for (int m = n; m>2*i; m--) {
					System.out.print("-");
				}
				if (i<up) {
					System.out.print("*");
				}
				System.out.println(); // 다음 줄로
			} // i end
			
			for (int j = down; j>=1; j--) {
//				System.out.print((n-j) + ": ");
				for (int m = 1; m<j; m++) {
					System.out.print("-");
				}
				System.out.print("*");
				for (int m = n; m>2*j; m--) {
					System.out.print("-");
				}
				if (j<=down) {
					System.out.print("*");
				}
				System.out.println(); // 다음 줄로
			} // j end
			
			
		} // if end
		
		
		
		System.out.println(); // 문제1 끝
		
		
		/* 문제 2. 소수 판별 테이블 출력
		 * 정수 n을 입력 받아, 1~n 까지의 수 중 소수 여부를 표 형태로 출력
		 */
		
		System.out.println("--- 문제2. 1부터 입력받은 수 까지의 수 중 소수 여부를 출력 ---");
		System.out.println();
		
		System.out.print("1이상의 자연수를 입력하세요: ");
		scanner = new Scanner(System.in);
		n = scanner.nextInt();
		
		if (!(n>=1)) {
			System.out.println("잘못된 값입니다. 1이상의 자연수를 입력하세요.");
		} else {
			
			for (int i = 1; i<=n; i++) {
				String prime = "o";
				if (i==1) {
					prime = "x";
				} else {
					for (int j = 2; j<i; j++) {
						if (i%j==0) {
							prime = "x";
						} // if j end
					} // j end
				} // if i end
				System.out.printf("%d: %s", i, prime);
				System.out.println();
			} // for i end 
		} // if else end
		
		System.out.println();
		
		
		/* 문제 3. 숫자 피라미드 변형
		 * 정수 n을 입력 받아, 각 *의 순서를 입력하는 피라미드 출력
		 */
		
		System.out.println("--- 문제3. 숫자 피라미드 변형 ---");
		System.out.println();
		
		System.out.print("수를 입력하세요: ");
		scanner = new Scanner(System.in);
		n = scanner.nextInt();
		
		int num = 1;
		for (int i = 1; i <=n; i++) {
			for (int j = 1; j<=i; j++) {
				System.out.print(num++ + "\t");
			}
			System.out.println(); // 다음 줄 엔터
		}
		
		System.out.println();
		
		
		/* 문제 4. 약수의 개수
		 * 정수 n을 입력 받아, 1부터 n까지 각 수에 대해 약수의 개수 출력
		 */
		
		System.out.println("--- 문제4. 약수의 개수 ---");
		System.out.println();
		
		System.out.print("자연수를 입력해주세요: ");
		scanner = new Scanner(System.in);
		n = scanner.nextInt();
		
		if (n<0) {
			System.out.println("잘못된 수입니다. 자연수를 입력해주세요.");
		}
		
		for (int i = 1; i <= n; i++) {
			int count = 0;
			for (int j = 1; j <= i; j++) {
				if (i%j==0) {
					count++;
				}
			} // for j end
			System.out.printf("%d : %d개", i, count);
			System.out.println();
		} // for i end
		
		System.out.println();

		
		
		
		/* 문제 5. n의 배수인 단만 구구단
		 * 정수 n을 입력 받아, 2단부터 9단까지 중에서 n의 배수인 단만 출력
		 */
		
		System.out.println("--- 문제5. 배수 구구단 ---");
		System.out.println();
		
		System.out.print("2 ~ 9 사이의 자연수를 입력해주세요: ");
		scanner = new Scanner(System.in);
		n = scanner.nextInt();
		
		if (n<2 || n>9) {
			System.out.println("잘못된 수를 입력하셨습니다.");
		} else {
			
			for (int i=2; i<=9; i++) {
				if (i%n==0) {
					System.out.println(i + "단");
					for (int j=1; j<=9; j++) {
						
						int answer = i*j;
						System.out.printf("%d x %d = %d", i, j, answer);
						System.out.println();
						
					} // for j end
					System.out.println();
				} // if i end
			} // for i end
			
		} // if else end
		
		
		System.out.println();

		
		
		
		/* 문제 6. 공배수 출력
		 * 정수 a, b, c를 입력 받아 1부터 c까지 중에 a와 b의 공배수를 모두 출력
		 */
		
		// a != b;
		// a <= c && b<= c;
		
		System.out.println("--- 문제6. 공배수 ---");
		System.out.println();
		
		System.out.println("a, b, c에 각각 자연수를 입력하세요. (단, a <= c, b <=c)");
		
		System.out.print("a: ");
		Scanner scanA = new Scanner(System.in);
		int a = scanA.nextInt();
		
		System.out.print("b: ");
		Scanner scanB = new Scanner(System.in);
		int b = scanB.nextInt();
		
		System.out.print("c: ");
		Scanner scanC = new Scanner(System.in);
		int c = scanC.nextInt();
		System.out.println();
		
		if (a>c || b>c || a<0 || b<0 || c<0) {
			System.out.println("잘못된 숫자입니다. a, b, c에 각각 자연수를 입력하세요. (단, a <= c, b <=c)");
		} else {
			System.out.printf("1부터 %d까지 중에서 %d와 %d의 공배수는 :", c, a, b);
			System.out.println();
			for (int i = 1; i<=c; i++) {
				if (i%a == 0 && i%b == 0) {
					System.out.print(i + " ");
				} // if end
			} // for end
			System.out.println();
		} // if else end
		
		
		System.out.println();

		
		
		/* 문제 7. 공약수 출력
		 * 정수 a, b를 입력 받아 공약수를 모두 출력
		 * 단, 공약수가 없다면 서로소라고 판별
		 */
		
		
		System.out.println("--- 문제7. a, b를 입력 받아 공약수를 모두 출력 ---");
		System.out.println();
		
		System.out.println("a, b 에 각각 자연수를 입력하세요");
		
		System.out.print("a: ");
		scanA = new Scanner(System.in);
		a = scanA.nextInt();
		
		System.out.print("b: ");
		scanB = new Scanner(System.in);
		b = scanB.nextInt();
		
		
		if (a<0 || b<0) {
			System.out.println("잘못입력하셨습니다. 자연수를 입력해주세요.");
		}
		
		int big;
		if (a<b) {
			big = b;
		} else {
			big = a;
		}
		
		int count = 0;
		
		System.out.printf("%d 와 %d 의 공약수: ", a, b);
		for (int i = 1; i <= big; i++) {
			if (a%i == 0 && b%i == 0) {
				System.out.print(i + " ");
				count++;
			} // if end
		} // for i end
		System.out.println();
		System.out.printf("%d 와 %d 의 공약수는 %d개", a, b, count);
		if (count == 1) {
			System.out.printf("%d 와 %d 는 서로소입니다.", a, b);
			System.out.println();
		}
		
		System.out.println();
		

	} // end

} // last end
