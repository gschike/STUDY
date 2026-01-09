import java.util.Scanner;

public class If {

	public static void main(String[] args) {
		
		int score = 93;
//		score = 83; // 조건에 부합하지 않아서 false가 나올 시, 실행되지 않음
		
		if (score>=90) {
			System.out.println("점수가 90점 보다 큽니다.");
			System.out.println("등급은 A입니다.");
		}
		
		// if 문 사이에 괄호가 없으면, 그 다음줄만 if 조건문에 해당하고, 그 다음줄은 조건문에 포함 안 됨
		if (score<90) 
			System.out.println("점수가 90점 보다 작습니다.");
		System.out.println("등급은 B입니다."); // 조건문에 해당 안 되고 항상 출력
			
			/* 결과
			 * 
			 * 점수가 90점 보다 큽니다.
			 * 등급은 A입니다.
			 * 등급은 B입니다.	
			 */
		
		
		System.out.println("------------------------");
		///////////////////////////
		score =85;
		
		if (score>=90) {
			System.out.println("점수가 90점 보다 큽니다.");
			System.out.println("등급은 A입니다.");
		} else {
			System.out.println("점수가 90점 보다 작습니다.");
			System.out.println("등급은 B입니다.");
		}
		System.out.println("수고하셨습니다.");
		
		System.out.println("------------------------");
		///////////////////////////
		score = 75;
		
		if (score>=90) {
			System.out.println("점수가 90점 보다 큽니다.");
			System.out.println("등급은 A입니다.");
		} else if (score>=80) {
			// 위에서 실행 후 false 일 때 내려오는 거기 때문에 자동으로 score<90으로 범위 좁혀짐
			System.out.println("점수가 80~90점 입니다.");
			System.out.println("등급은 B입니다.");
		} else {
			System.out.println("점수가 80점 보다 작습니다.");
			System.out.println("등급은 C입니다.");
		}
		
		
		
		
		System.out.println("------------------------");
		///////////////////////////
		
		double a = Math.random(); // double 범위 0.0~1.0 사이의 실수 무작위
		System.out.println(a);
		
		a = Math.random()*10; // double 범위 0.0~10.0 사이의 실수 무작위: 0.123687 이렇게 나올 수도 있음
		System.out.println("a: " + a);
		
		int b = (int)Math.random()*10; // 소수로 나오는 random을 int한 후 10을 곱하기 때문에 0,10 중에서 나오게 됨
		System.out.println("b: " + b);

		int c = (int)(Math.random()*10); // 괄호로 먼저 곱해줘야 int 범위 0~10 사이의 정수 무작위
		System.out.println("c: " + c);
		
		
		System.out.println("------------주사위 무작위------------");
		int dice = (int)(Math.random()*6) + 1; // *범위, +시작할 번호
		System.out.println("주사위: " + dice);
			
		System.out.println("------------로또 무작위------------");
		int lotto = (int)(Math.random()*45) + 1; // *범위, +시작할 번호
		System.out.println("로또: " + lotto);
		
		
		
		
		System.out.println("------------ Switch ------------");
		//////////// switch문 ///////////////
		
		switch (dice) {
		
		case 1:
			System.out.println("1이 나왔습니다.");
			break;
		case 2:
			System.out.println("2가 나왔습니다.");
			break;
		case 3:
			System.out.println("3이 나왔습니다.");
			break;
		case 4:
			System.out.println("4이 나왔습니다.");
			break;
		case 5:
			System.out.println("5이 나왔습니다.");
			break;
		case 6:
			System.out.println("6이 나왔습니다.");
			break;
			
		// break를 적지 않으면, 예를 들어 4가 나왔을 떄, 4,5,6 모두 실행됨
		}
		
		
		System.out.println("------------ char ------------");
		
		char grade = 'c'; // char 타입이므로 'none'은 안 됨
		
		switch (grade) {
		case 'A':
		case 'a':
			System.out.println("우수 회원입니다");
			break;
			
		case 'B':
		case 'b': // 대소문자 상관 없이
			System.out.println("일반 회원입니다");
			break;
			
		default: // 디폴트값
			System.out.println("비회원입니다");
		}
		
		
		System.out.println("------------ String ------------");
		
		String position = "과장";
		
		switch (position) {
		case "부장":
			System.out.println("700만원");
			break;
			
		case "과장":
			System.out.println("500만원");
			break;
			
		default:
			System.out.println("300만원");
		}
		
		
		
		System.out.println("------------ for ------------");
		//////////// for문 ///////////////
		
		int sum = 0;
		//   초기화식; 조건식; 증감식
		for (int i=1; i<=5; i++) {
//			sum = sum + i;
			sum += i;
		}
		System.out.println(sum);
		
		System.out.println("------------------------");
	
		for (int i=1; i<=10; i++) {
			System.out.println(i);
		}
		
		System.out.println("------------------------");
	
		for (int i=1; i<=5; i+=2) {
			System.out.println(i);
		}
		// 이때, for문 안에 있는 i는 출력문에 사용할 수 없음. i는 for문 ( ) 안에서만 사용
		
		System.out.println("------------------------");
		
		sum = 0;
		for (int i=1; i<=100; i++) {
			sum += i;
		}
		System.out.println(sum);

		System.out.println("------------------------");
		
		// 주의 : for 문의 초기화식에 float(부동소수점 때문) 사용하면 안 됨
		// 1.0f = 사실 1.0000000424 이런식이어서 1부터 시행되지 않음
		sum = 0;
		for (int i=2; i<=100; i += 2) {
			sum += i;
		}
		System.out.println(sum);
		
		System.out.println("------------ 중첩 for ------------");
		//////////// 중첩 for문 ///////////////
		
		// 구구단
		for (int m=1; m<=9; m++) {
			System.out.println();
			System.out.println(m + "단");
			for (int n=1; n<=9; n++) {
				System.out.printf("%d*%d = %d", m, n, (m*n));
				System.out.println();
			}
		}
		
		// 정수 1부터 10까지의 합을 for 반복문을 사용하여 출력하는 프로그램을 작성하세요.
		sum = 0;
		for (int n=1; n<=10; n++) {
			sum += n;
			System.out.println(sum);
		}
		// 최종합만 구하는 식. syso를 for문 밖으로
		sum = 0;
		for (int n=1; n<=10; n++) {
			sum += n;
		}
		System.out.println(sum);
		
		
		// 사용자로부터 정수 하나를 입력받아,
		// 1부터 해당 숫자까지의 짝수만 출력하는 프로그램을 작성하세요.
		
//		Scanner scanner = new Scanner(System.in);
//		int input = scanner.nextInt();
		
//		for (int i=2; i<=input; i+=2) {
//			System.out.println(i);
//		}
		
//		// for 안에 if 조건문 활용하여 더 깔끔하게 출력 가능
//		for (int i=1; i<=input; i++) {
//			if (i%2==0) {
//				System.out.println(i);
//			}
//		}
		
//		*
//		**
//		***
//		****
//		*****
		// 이런 식으로 늘어나는 거
		
		for (int i=1; i<=5; i++) {
			for (int n=1; n<=i; n++) {
				System.out.printf("*");
			}
			System.out.println();
		}
		
		System.out.println();
		
		// 다이아몬드 만들기
		
		for (int i=3; i>=1; i--) {
			for (int n=1; n<=i; n++) {
				System.out.printf(" ");
			}
			System.out.printf("*");
			System.out.println();
		}
		
		for (int i=3; i>=0; i--) {
			for (int n=1; n<=i; n++) {
				System.out.printf(" ");
			}
			System.out.printf("*");
			for (int m=3; m>i; m--) {
				System.out.printf(" ");
			}
			for (int l=1; l>=i; l--) {
				System.out.printf(" ");
			}
			if (i<3) {
				System.out.printf("*");
			}
			
			System.out.println();
		}
		for (int i=1; i<=3; i++) {
			for (int n=1; n<=i; n++) {
				System.out.printf(" ");
			}
			System.out.printf("*");
			for (int m=3; m>i; m--) {
				System.out.printf(" ");
			}
			for (int l=2; l>i; l--) {
				System.out.printf(" ");
			}
			if (i<3) {
				System.out.printf("*");
			}
			System.out.println();
		}
		
		
		
		
		
		for (int i=0; i<=3; i++) {
			for (int n=3; n>i; n--) {
				System.out.printf(" ");
			}
			System.out.printf("*");
			for (int m=1; m<(i*2); m++) {
				System.out.printf(" ");
			}
			if (i>0) {
				System.out.printf("*");
			}
			System.out.println();
		}
		for (int i=1; i<=3; i++) {
			for (int n=1; n<=i; n++) {
				System.out.printf(" ");
			}
			System.out.printf("*");
			for (int m=5; m>(i*2); m--) {
				System.out.printf(" ");
			}
			if (i<3) {
				System.out.printf("*");
			}
			
			System.out.println();
		}
		
		
		
		
	}
}
