package chap02;

public class VarTypeExam {

	public static void main(String[] args) {
		
		// byte는 -128 ~ 127 까지 저장 가능. 그 외에는 오류 남
		byte b1;
		b1 = 127;
		System.out.println("b1: "+b1);
//		b1 = 128; // 에러 발생
		
		
		// char는 문자. 아스키 코드를 따라 출력됨
		char c1 = 65;
		System.out.println("c1: "+c1);
		char c2 = 65 + 2;
		System.out.println("c2: "+c2);
		char c3 = 'B'; // ''는 char에서만 사용됨. char에서는 "" 사용 안 되고, ''안에는 한 글자만 가능
		System.out.println("c3: "+c3); // 내부적으로는 66을 저장, 출력은 B로
		System.out.println("c3-c1: "+(c3-c1));
		
		
		// long에는 약 21억까지 들어감
		// 뒤에 l 또는 L을 붙여서 명시적인 long 타입임을 알려야 함. 붙이지 않으면 int로 생각됨
		long l1 = 2200000000L;
		long l2 = 30;
		System.out.println("l1: "+l1);
		System.out.println("l2: "+l2);
		
		
		
		
		///////////////////////////////////////////////////////
		// String은 원시타입이 아니고 일종의 클래스임. 클래스는 대문자로 시작!
		
		// String : 문자, 여러 자 가능, "" 안에
		String s1 = "홍세정";
		System.out.println("s1: "+s1);
		
		// "를 문자로 사용하고 싶으면 \" 이렇게 쓸 수 있음
		// \ 다음에 오는 한 글자는 문자로 인식됨
		String s2 = "홍\"세정\"";
		System.out.println("s2: "+s2);
		
		// \t는 탭만큼 띄움 탭 문자, \n은 엔터, \r 캐리지리턴 맨앞으로
		String s3 = "\\홍\t세\n정\r짱";
		System.out.println("s3: "+s3);
		
		
		// 문자에 다음에 더하면 무조건 숫자 타입도 문자가 됨
		System.out.println("글씨"+3);
		System.out.println("글씨"+3+2); // 결과: 글씨32 // 앞에서부터 계산
		System.out.println(3+2+"글씨"); // 결과: 5글씨 // 숫자+숫자+글씨
		System.out.println("글씨"+(3+2)); // 결과: 글씨5 // 괄호 먼저 계산
		
		
		
		
		///////////////////////////////////////////////////
		
//		int a = 3.14; // int는 정수 타입이므로 소수를 담을 수 없음
		
		float f1 = 3.14f; // f 써야함
		System.out.println("f1: "+f1);
		
		double d1 = 3.14; // d 안 씀
		System.out.println("d1: "+d1);
		
		float f2 = 0.1234567890123f; // 소수점 연산이 약해서 뒤에서 끊김
		System.out.println("f2: "+f2); // 결과: 0.12345679
		// float의 정밀도 : 소수점 7자리. 7번째까진 정확하고, 9번째 자리에서 반올림되어 8번째까지 나옴
		
		double d2 = 0.12345678901234567890;
		System.out.println("d2: "+d2);
		// double의 정밀도 : 소수점 15자리. 17번째에 반올림해서 16번째까지 나옴
		
		double d3 = 5e3; // en는 10^n 승을 의미
		System.out.println("d3: "+d3); // 결과: 5000
		
		double d4 = 5e-3; // e-n는 10^-n 승을 의미
		System.out.println("d4: "+d4); // 결과: 0.005

		
		
		
		
		///////////////////////////////////////////////////
//		boolean : true or false, 1byte(최소 단위)
		
		boolean stop = true; // 문자열이 아니고 상태값임
//		boolean start = false;
		
		System.out.println("stop: "+stop);
		
		
		// 문제 1
		// 내 나이를 저장
		
		int age = 25;
		System.out.println("내 나이: " + age);
		
		
		// 문제 2
		// 운전 면허가 있다, 없다
		boolean license = true;
		System.out.println("면허: " + license);
		
		//////////////////////////////////
		if (license) {
			System.out.println("면허: " + "있다");
		} else {
			System.out.println("면허: " + "없다");
		}
		
		
		// 문제 3
		// 우리 집에 있는 스마트폰의 개수
		int phone = 1;
		System.out.println("스마트폰의 개수: " + phone);
		
		
		// 문제 4
		// 내 이름
		String name = "홍세정";
		System.out.println("내 이름: " + name);
		
		
		// 문제 5
		// 1평은 3.3제곱미터, 5평은 몇 제곱미터?
		double base = 3.3;
		double room = 5;
		double size = (base * room);
		System.out.println("5평: " + size + "제곱미터");
		
		
		
		// 문제 6
		// 1-1 : 두 변수 x, y에 각각 임의이 수를 넣고
		//  출력 결과 : "3 > 4 결과는 false 입니다"
		int x = 3;
		int y = 4;
		boolean result = x > y;
		System.out.println(x + " > " + y + " 결과는 " + result + " 입니다");
		
		// boolean이 아니어도 자동으로 true, false 계산함
//		System.out.println(x + " > " + y + " 결과는 " + (x>y) + " 입니다");
		
		
		// 1-2 : x, y 값 바꿔서 정답 출력
		x = 4;
		y = 3;
		result = x > y;
		System.out.println(x + " > " + y + " 결과는 " + result + " 입니다");
		
		
		
		// 문제 7
		/* 숫자 149
		 * ---------
		 * 출력 결과
		 * 100의 자리 : 1
		 * 10의 자리 : 4
		 * 1의 자리 : 9
		 * */
		int num = 345;
		System.out.println("100의 자리 : " + (num/100));
		System.out.println("10의 자리 : " + (num-((num/100)*100))/10);
		System.out.println("1의 자리 : " + (num-((num/10)*10))/1);
		
//		int first = 1;
//		int second = 4;
//		int third = 9;
//		int num2 = first*100 + second*10 + third*1;
//		System.out.println("100의 자리 : " + first);
//		System.out.println("10의 자리 : " + second);
//		System.out.println("1의 자리 : " + third);
	
		int num3 = 789;
		int first3 = num3/100;
		int second3 = (num3-(first3*100))/10;
		int third3 = num3-((num3/10)*10);
		System.out.println("100의 자리 : " + first3);
		System.out.println("10의 자리 : " + second3);
		System.out.println("1의 자리 : " + third3);
		
		
		
		// 문제 8
		// 회식비 43000원
		// 참석인원 4명
		// 인당 얼마?
		
		// 8-1 : 디테일하게 원단위까지
		int price = 43000;
		int people = 4;
		int price1 = (price/people);
		System.out.println("n빵 : " + price1 + "원");
		
		// 8-2 : 만원 단위까지
		int price2 = (price1/10000)*10000;
		System.out.println("만원단위 : " + (price2) + "원");
		
		// 8-3 : 만원 단위까지 하고 주최자가 낼 금액
		System.out.println("주최자 : " + (price-(price2*(people-1))) + "원");
		
		
		
		// 문제 9
		String left = "오예스";
		String right = "사탕";
		
		String middle; // 빈 변수 선언
		middle = left; // 빈 변수에 left 덮어쓰기
		left = right;
		right = middle;
		
		System.out.println("left: "+left); //사탕
		System.out.println("right: "+right); //오예스
		
		
	
	}

}
