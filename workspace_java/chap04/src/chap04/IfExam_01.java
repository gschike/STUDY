package chap04;

import java.util.Scanner;

public class IfExam_01 {

	public static void main(String[] args) {

		int score = 95;
		boolean over90 = (score>=90);
		{
			System.out.println("항상 실행되는 실행 블럭");
		}
		
		// (over90=false) 는 안 되네...
		if (over90) // (over90) : over90이 참일 때, =true 생략 가능
		{
			System.out.println("90점 이상입니다.");
		} // 실행문이 하나라면 중괄호를 생략할 수 있지만, 추천하지 않음
		
		
		score = 85;
		if (score < 90) {
			System.out.println("90점 미만입니다.");
		}
		// 둘이 같은 거. 조건에 부정연산자를 사용하여 경계값을 놓칠 확률을 줄임
		if (!(score >= 90)) {
			System.out.println("90점 미만입니다.");
		}
		
		score = 90;
		if (score>=90) {
			System.out.println("90점 이상입니다.");
		} else { // 그렇지 않으면
			System.out.println("90점 미만입니다.");
		}
		// else가 있으면, 무조건 하나는 실행되는 게 보장됨
		// 선행되는 조건이 참이면, 그 다음 조건은 쳐다도 안 봄
		
		
		

		
		score = 95;
		
		System.out.println("------------------------------");

		if (score>=90) {
			System.out.println("90이상");
		}
		// *** 이전과 관계 없이 무조건 판단
		if (score<=100 && score>=80) {
			System.out.println("80~100점");
		} // 둘 다 실행됨
		
		// 만약 else if가 아니라 if를 여러개 사용해서 조건을 설정하고
		// if (score>=90) / if (score>=80) 처럼 겹치는 범위가 있으면
		// score가 90 이상일 때, A와 B가 둘 다 출력됨
		
		
		System.out.println("------------------------------");
		
		if (score>=90) {
			System.out.println("90이상");
		} else if (score<=100 && score>=80) { // 조건 안에 100>=score>=80 처럼 합쳐서는 안 됨
			System.out.println("80~100");
		} // ***  위의 if나 else if 가 거짓일 때만 판단함
		
		
		
		System.out.println("-------- if 안에 if ---------");
		// 만약에 97점이면
		// 출력 : 90이상, 95이상 모두 출력
		// 그런데 92점이면
		// 출력 : 90이상 만 출력
		score = 92;
		
		if (score>=90) {
			System.out.println("90점 이상");
			if (score>=95) {
				System.out.println("95점 이상");
			}
		}
		if (score>=90) {
			if (score>=95) {
				System.out.println("95점 이상");
			}
		} // 아래와 같은 코드
		if (score>=90 && score>=95) {
			System.out.println("95점 이상");
		}
		
		
		
		System.out.println("------------------------------");

		score = 78;
		if (score>=90) {
			System.out.println("A입니다.");
		} else if (score >=80) { // !(score>=90) 이 자동으로 포함되는 거임
			System.out.println("B입니다.");
		} else if (score >= 70) {
			System.out.println("C입니다.");
		} else {
			System.out.println("D입니다.");
		}

		
		
		System.out.println("------------------------------");
		
		int x = 3;
		
		if ( x%2 != 0) {
			System.out.println("홀수입니다.");
		} else {
			System.out.println("짝수입니다.");
		}
		
		
		//////////////////////////////
		System.out.println("--------------- 랜덤 --------------");
		
		double random1 = Math.random();
		System.out.println("random1: " + random1);
		
		
		/* Math.random()
		 * 
		 * double
		 * 0 <= Math.random() < 1
		 */
		
		System.out.println("--------------- 홀짝 --------------");
		// 1. 홀짝
		// -1 이해하고 만들어가기
//		int r = (int)(Math.random()*10);
//		System.out.println("r: " + r);
//		if (r%2==0) {
//			System.out.println("짝수입니다");
//		} else {
//			System.out.println("홀수입니다");
//		}
		
		// -2 0과 1을 구하는 정교한 계산 방식
		// 0*2 <= Math.random()*2 < 1*2
		// 0 ~ 1.99999999999999999
		// int로 type casting 해서 정수만 남기기
		// 0 or 1
		int r = (int)(Math.random()*2);
		if (r==0) {
			System.out.println(r + ": " + "짝수");
		} else {
			System.out.println(r + ": " + "홀수");
		}
		
		System.out.println("--------------- 주사위 --------------");
		////////// 주사위 /////////
		int random2 = (int)(Math.random()*6) + 1;
		System.out.println("random2: " + random2);
		
		
		System.out.println("--------------- 5~10 --------------");
		///////// 5 ~ 10 //////////
		double r2 = Math.random(); // 0 ~ 0.99999999
		double temp2 = r2*6; // 0 ~ 5.999999999
		int result = (int)temp2; // 0 ~ 5
		int result2 = result+5; // 5 ~ 10
		System.out.println("result2: " + result2);
		
		int rand = (int)(Math.random()*6) + 5;
		System.out.println("rand: " + rand);
		
		// 변수로 범위를 잡아서 보편화
		int min = 5;
		int max = 10;
		// ********* //
			// (max-min+1)을 곱하고 min 더하기
		int rand2 = (int)(Math.random()*(max-min+1)) + min;
		// ********* //
		System.out.println("5~10: " + rand2);
		
		// 주사위 쉬운 방식 //
		double rand3 = Math.random();
		double temp3 = rand3*100000; // 대충 큰 수 곱하기
		int result3 = (int)temp3; // 정수
		result = (result3 % 6)+1; // 6으로 나눈 나머지는 0 ~ 5 / +1 하면 1 ~ 6
		
		
		// 1 ~ 45까지 6개의 숫자를 랜덤으로 뽑아서 제출
		// 단, 중복 안 됨
//		System.out.println("--------------- 로또 --------------");
//		int lotto1 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto1 + " ");
//		int lotto2 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto2 + " ");
//		int lotto3 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto3 + " ");
//		int lotto4 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto4 + " ");
//		int lotto5 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto5 + " ");
//		int lotto6 = (int)(Math.random()*45) + 1;
//		System.out.print(lotto6 + " ");
//		System.out.println();
		
		// for 반복문 활용
		for (int i = 0; i < 6; i++) {
			int lotto = (int)(Math.random()*45)+1;
			System.out.print(lotto + " ");
		}
		System.out.println();
		System.out.println();
		System.out.println("----- 문제 -----");
		System.out.println();
		System.out.println();
		
		
				
		// 임의의 수를 입력받아
		
		
		System.out.println("1번. 임의의 수를 입력받아 양수, 0, 음수 판단");
		System.out.print("number: ");
		
		//스캐너 선언
		Scanner scanner = new Scanner(System.in);
		// 스캐너에 입력하는 내용 string 타입 변수에 저장
		String number = scanner.nextLine();
		// string 타입 int 타입으로 변환
		int num = Integer.parseInt(number);
		
		/* 문제 1
		 * 그 수가 양수인지, 0인지, 음수인지 판단하여 출력 */
		if (num>0) { // 0보다 클 때 양수
			System.out.println(num + ": 양수");
		} else if (num==0) { // 0일 때 0
			System.out.println(num + ": 0");
		} else { // 0보다 작을 때 음수
			System.out.println(num + ": 음수");
		}

		System.out.println();
				
		
		/* 문제 2
		 * 홀수인지 짝수인지 판단하여 출력. 0은 짝수임
		 * */
		System.out.println("2번. 임의의 수를 입력 받아 홀수인지 짝수인지 판단 (단, 0은 짝수)");
		System.out.print("number: ");
		
		// 스캐너 선언
		Scanner scanner2 = new Scanner(System.in);
		// 입력받은 값 string 타입으로 저장
		String number2 = scanner2.nextLine();
		// string 타입 int 타입으로 변환
		int num2 = Integer.parseInt(number2);
		
		
		if (num2%2==0) {	// 2로 나눈 나머지가 0이면 짝수
			System.out.println("짝수입니다");
		} else {	// 2로 나눈 나머지가 0이 아니면 홀수
			System.out.println("홀수입니다");
		}
		
		System.out.println();
	
		
		
		
		/* 문제 3
		 * 임의의 두 수 x, y를 받아서 둘 중에 더 큰 값 출력*/
		System.out.println("3번. 임의의 두 수 x, y를 입력 받아서 둘 중 더 큰 값 출력");
		
		System.out.print("x: ");
		// x 스캐너 선언, string 타입으로 저장, string 타입 int로 변환
		Scanner scanner3x = new Scanner(System.in);
		String strX = scanner3x.nextLine();
		x = Integer.parseInt(strX);
		
		System.out.print("y: ");
		// y 스캐너 선언, string 타입으로 저장, string 타입 int로 변환
		Scanner scanner3y = new Scanner(System.in);
		String strY = scanner3y.nextLine();
		int y = Integer.parseInt(strY);
		
		if (x>y) {
			System.out.println("더 큰 수: " + x);
		} else if (x<y) {
			System.out.println("더 큰 수: " + y);
		} else {
			System.out.println("두 수가 같습니다");
		}

		System.out.println();
		
		
		/* 문제 4
		 * 임의의 money를 입력 받아서 
		 * 7000원 이상이면 택시타자
		 * 3000~7000원 버스타자
		 * 3000원 미만이면 걸어가자*/
		System.out.println("4번. money를 입력 받아서 택시, 버스, 걸어가기 출력");
		
		System.out.print("money: ");
		// 스캐너 선언, string에 저장, int로 변환
		Scanner sMoney = new Scanner(System.in);
		String strMoney = sMoney.nextLine();
		int money = Integer.parseInt(strMoney);
		
		if (money>=7000) {
			System.out.println("택시타자");
		} else if (money>=3000) {
			System.out.println("버스타자");
		} else {
			System.out.println("걸어가자");
		}
		
		System.out.println();
		
		
		/* 문제 5
		 * '가위', '바위', '보' 입력 받아서
		 * 
		 * 5-1. 컴퓨터는 항상 '바위'만 낼 경우
		 * 5-2. 컴퓨터도 랜덤으로
		 * 이겼다 비겼다 졌다
		 */
		System.out.println("5-1번. 컴퓨터는 항상 바위만 낼 때, 가위, 바위, 보");
		
		System.out.println("'가위', '바위', '보' 중에 입력하세요");
		// 스캐너 선언, 스캐너에 입력받은 값 저장
		Scanner s5 = new Scanner(System.in);
		String str5 = s5.nextLine();
		
		// 컴퓨터가 내는 값 "바위"
		String com = "바위";
		
		// 사용자 입력값이 가위 또는 바위 또는 보 가 아닐 경우
		if (!("가위".equals(str5) || "바위".equals(str5) || "보".equals(str5))) {
			System.out.println("잘못된 값입니다. '가위', '바위', '보' 중에 입력하세요.");
		} else if ("가위".equals(str5)) {
			System.out.println("당신이 졌습니다");
		} else if ("바위".equals(str5)) {
			System.out.println("비겼습니다");
		} else {
			System.out.println("당신이 이겼습니다");
		}
		
		
		System.out.println();
		
		
		
		System.out.println("5-2번. 컴퓨터가 랜덤일 때, 가위, 바위, 보");
		
		System.out.println("'가위', '바위', '보' 중에 입력하세요");
		// 스캐너 선언, 입력받은 값 저장
		Scanner s5_2 = new Scanner(System.in);
		String str5_2 = s5_2.nextLine();
		
		// 컴퓨터가 낼 변수 선언
		String com2;
		
		// 랜덤으로 0, 1, 2 출력
		int temp5 = (int)(Math.random()*3); // 0~2.999 -> 0, 1, 2
		// 2일 때 가위, 1일 때 바위, 0일 때 보 를 컴퓨터가 낼 변수에 저장
		if (temp5 == 2) {
			com2 = "가위";
		} else if (temp5 == 1) {
			com2 = "바위";
		} else {
			com2 = "보";
		}
		
		
//		if (com2.equals(str5_2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("비겼습니다");
//		} else if ("가위".equals(str5_2)&&"바위".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 졌습니다");
//		} else if ("가위".equals(str5_2)&&"보".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 이겼습니다");
//		} else if ("바위".equals(str5_2)&&"보".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 졌습니다");
//		} else if ("바위".equals(str5_2)&&"가위".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 이겼습니다");
//		} else if ("보".equals(str5_2)&&"가위".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 졌습니다");
//		} else if ("보".equals(str5_2)&&"바위".equals(com2)) {
//			System.out.println("컴퓨터: " + com2);
//			System.out.println("당신이 이겼습니다");
//		} else {
//			System.out.println("잘못된 값입니다. '가위', '바위', '보' 중에 입력하세요.");
//		}
		
		System.out.println("컴퓨터: " + com2);
		
		if (com2.equals(str5_2)) {
			System.out.println("비겼습니다.");
		} else if (("가위".equals(str5_2)&&"바위".equals(com2)) || 
					("바위".equals(str5_2)&&"보".equals(com2)) ||
					("보".equals(str5_2)&&"가위".equals(com2)) ) {
			System.out.println("당신이 졌습니다.");
		} else if (("가위".equals(str5_2)&&"보".equals(com2)) || 
					("바위".equals(str5_2)&&"가위".equals(com2)) ||
					("보".equals(str5_2)&&"바위".equals(com2)) ) {
			System.out.println("당신이 이겼습니다.");
		} else {
			System.out.println("잘못된 값입니다. '가위', '바위', '보' 중에 입력하세요.");
		}
		
	
		System.out.println();
		
		
		
		/* 문제6
		 * 임의의 세 수 x, y, z를 받아서
		 * z가 x, y 사이에 있는지 (포함) 판단
		 */
		
		System.out.println("6번. 임의의 세 수 x, y, z를 받아서 z가 x와 y 사잇값인지 판단");
		
		// 스캐너 선언, 사용자가 입력한 int 값 바로 저장
		System.out.print("x: ");
		Scanner sX6 = new Scanner(System.in);
		int x6 = sX6.nextInt();
		System.out.print("y: ");
		Scanner sY6 = new Scanner(System.in);
		int y6 = sY6.nextInt();
		System.out.print("z: ");
		Scanner sZ6 = new Scanner(System.in);
		int z6 = sZ6.nextInt();
		
		if (z6<=x6 && z6>=y6) { // y<=z<=x
			System.out.println("z가 x와 y 사이의 값입니다");
		} else if (z6>=x6 && z6<=y6) { // x<=z<=y
			System.out.println("z가 x와 y 사이의 값입니다");
		} else {
			System.out.println("z가 x와 y 사이의 값이 아닙니다");
		}
		
		System.out.println();
		
	
		
		/* 문제7
		 * 월(몇 월)을 입력 받아서 계절 출력
		 * 13, -1 등을 입력하면 "정확히 입력해주세요" 출력 -- 방어코딩
		 */
		System.out.println("7번. month를 입력 받아 계절 출력");
		
		// 스캐너 선언, int 값 바로 받아오기
		System.out.print("month: ");
		Scanner sMonth = new Scanner(System.in);
		int month = sMonth.nextInt();
		
		if (month>=3 && month<=5) {
			System.out.println("봄입니다");
		} else if (month>=6 && month<=8) {
			System.out.println("여름입니다");
		} else if (month>=9 && month<=11) {
			System.out.println("가을입니다");
		} else if (month==12 || month>=1 && month<=2) {
			System.out.println("겨울입니다");
		} else {
			System.out.println("정확히 입력해주세요");
		}
		
		System.out.println();
		
		
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
		
		if (num8>100) {
			System.out.print("입력한 수는 100보다 크고, ");
		} else {
			System.out.print("입력한 수는 100보다 작거나 같고, ");
		}
		if (num8>=0) {
			System.out.print("양수이고, ");
		} else {
			System.out.print("음수이고, ");
		}
		if (num8%2==0) {
			System.out.println("짝수입니다.");
		} else {
			System.out.println("홀수입니다.");
		}
		
		System.out.println();
		
		
		
		
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
			num9 = num9*(-1); // 부호 떼는 작업 중요
		} else if (num9>0) {
			System.out.print("영상 ");
		} else {
			System.out.print("");
		}
		System.out.print(num9 + "도 입니다");
		
		System.out.println();
		System.out.println();
		
		
		/* 문제10 -- 어려운 문제, 응용 문제
		 * 시, 분을 입력 받아서 35분 후의 시, 분을 출력
		 */
		
		System.out.println("10번. 시와 분을 입력 받아 몇 분 후의 시각을 출력");
		
		// 스캐너 선언,  string으로 값 받아오기, int로 변환
		System.out.print("시: ");
		Scanner sHour = new Scanner(System.in);
		String strHour = sHour.next();
		int hour = Integer.parseInt(strHour);
		System.out.print("분: ");
		Scanner sMinute = new Scanner(System.in);
		String strMinute = sMinute.next();
		int minute = Integer.parseInt(strMinute);
		
		// 35분 후
//		int after = 35;
		// 사용자가 입력한 시간 후
		System.out.print("몇 분 후: ");
		Scanner sAfter = new Scanner(System.in);
		int after = sAfter.nextInt();
		
		
		int minuteAfter = minute + after;
		
		// 시간 변화 선언
		int hourAfter = hour;
		// 60분 넘으면 시간 변화, 분 변화
		if (minuteAfter >= 60) {
			hourAfter = hour + 1;
			minuteAfter -= 60;
		}
		
		// 날짜 변화 선언
		int dayAfter = 0;
		// 24시 넘으면 날짜 변화, 시간 변화
		if (hourAfter >= 24) {
			dayAfter += 1;
			hourAfter -= 24;
		}
		
		// 출력
		if (hour >= 24 || minute >= 60) {
			System.out.println("잘못된 시간입니다. 다시 입력해주세요.");
			// 24시 이상, 60분 이상 시 잘못된 시간입니다
		} else if (dayAfter == 0) {
			System.out.println(hourAfter + "시" + minuteAfter + "분");
			// 날짜 변화 없을 시 시, 분
		} else {
			System.out.println(dayAfter + "일" + hourAfter + "시" + minuteAfter + "분");
			// 날짜 변화 있을 시 일, 시, 분
		}
		
		System.out.println();
		
		
		/* 문제 11
		 * 두 자리 숫자를 입력 받아서
		 * 10의 자리와 1의 자리가 같은지 판단
		 */
		
		System.out.println("11번. 두 자리 숫자를 입력 받아 십의 자리와 일의 자리가 같은지 판단");
		
		System.out.print("두 자리 숫자를 입력해주세요: ");
		Scanner snum11 = new Scanner(System.in);
		int num11 = snum11.nextInt();

		int num11First = num11/10; // 십의 자리
		int num11Second = num11%10; // 일의 자리 : 나머지 활용!!!!!!!
		
		if (num11<10 || num11>99) {
			System.out.println("잘못된 숫자입니다. 두 자리 숫자를 입력해주세요.");
		} else if (num11First == num11Second) {
			System.out.println("십의 자리와 일의 자리가 동일합니다.");
		} else {
			System.out.println("십의 자리와 일의 자리가 동일하지 않습니다.");
		}
		
		System.out.println();
		
		
		/* 문제 12
		 * 1~99까지 369 게임
		 * 임의의 수를 받아서 369 숫자를 포함하면 "짝" 한 번 출력하기
		 */
		
		System.out.println("12번. 1~99의 숫자를 입력 받아 369게임");
		
		System.out.print("1 ~ 99 사이의 숫자를 입력해주세요: ");
		Scanner snum12 = new Scanner(System.in);
		int num12 = snum12.nextInt();
		
		int num12First = num12/10; // 십의 자리 숫자
//		int num12Second = num12-((num12/10)*10);
		int num12Second = num12%10; // 일의 자리 숫자 : 나머지 활용!!!
		
		if (num12<1 || num12>99) {
			System.out.println("잘못된 숫자입니다. 1 ~ 99 사이의 숫자를 입력해주세요.");
		}	else if (num12First == 3 || num12First == 6 || num12First == 9 || num12Second == 3 || num12Second == 6 || num12Second == 9) {
			System.out.println("짝!!!");
		}	else {
			System.out.println(num12);
		}
		
		System.out.println();
		
		
		
		/* 문제 13
		 * 사각형의 한 쪽 꼭짓점 : x1: 10, y1:20
		 * 반대쪽 꼭짓점 : x2: 90, y2: 100
		 * 
		 * 입력받은 두 수를 좌표로 하는 점이 사각형에 겹치는가?
		 */
		System.out.println("13번. 입력받은 좌표가 사각형 안에 겹치는가?");
		
		System.out.print("x: ");
		Scanner sX13 = new Scanner(System.in);
		int x13 = sX13.nextInt();
		System.out.print("y: ");
		Scanner sY13 = new Scanner(System.in);
		int y13 = sY13.nextInt();		
		
		int x1_13 = 10, x2_13 = 90;
		int y1_13 = 20, y2_13 = 100;
		
		if (x13>=x1_13 && x13<=x2_13 && y13>=y1_13 && y13<=y2_13) {
			System.out.println("사각형 사이에 위치함");
		} else {
			System.out.println("사각형 사이에 위치하지 않음");
		}
		
		System.out.println();
		
		
		
		// 모두 && 일 때, false를 찾으면 끝남

		/* if (false && true) {
		 * 
		 * }
		 * 
		 * 
		 * => false
		 *  :: 이미 false를 만났기 때문에 조건은 끝남. && 는 false를 찾아다니며, false이면 끝, false가 발견 안 되면 실행
		 */
		
		// 모두 || 일 때, true를 찾으면 끝남
		
		/* if (true || false) {
		 * 
		 * }
		 * 
		 * 
		 * => true
		 *  :: 이미 true 를 만났기 때문에 조건은 끝남. || 는 true를 찾아다니며, true이면 끝, true가 발견 안 되면 실행
		 */
		
		
	} //

}
