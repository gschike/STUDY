package chap02;

public class TypeCastingExam {

	public static void main(String[] args) {
		
		// 강제 형 변환
		int intValue = 10;
//		byte byteValue = intValue; // int가 더 큰 타입이기 때문에 넣을 수 없음
		byte byteValue = (byte)intValue; // int를 byte로 강제 형 변환
		
		System.out.println(byteValue);
		
		
		/// 여기서 ( )는 우선 순위 연산자
//		int a = 2 * (3 + 4);
		
		/// 여기서 ( )는 형 변환 연산자
//		byte byteValue2 = (byte)intValue;
		
		
		
		intValue = 200;
		byteValue = (byte) intValue;
		System.out.println(byteValue); // 결과: -56
		// byte 는 127까지만 저장 가능. 임의로 앞에가 잘리기 때문에 이상한 숫자 나옴
		// 정확히는 비트를 2의 보수로 계산한 결과가 나옴
		// 예상이 힘듦
		
		
		
		double d1 = 3.14;
		float f1 = (float)d1;
		System.out.println(f1);
		
		
//		long l1 = 2200000000; // 빨간줄이 나오는 이유 : int라서! int에는 21억 얼마가 최대
//		long l1 = (long)2200000000; // 숫자 읽은 후 형 변환 연산자 읽기 때문에 의미 없음

		double d2 = -3.14;
		int i1 = (int) d2;
		System.out.println("i1: " + i1);
		
		// 작은 것에서 큰 것으로 변환할 때는 형 변환 생략 가능
		int i2 = 100;
		long l2 = (long)i2;
		long l3 = i2; // int < long : 자동 형 변환, (long) 생략 가능
		long l4 = 100; // 100은 int : 자동 형 변환

		int i3 = 2100000000;
		int i4 = 2100000000;
		int i5 = i3+i4; // 결과 : -94967296
		// 에러는 발생하지 않지만, int에서 overflow가 발생하기 때문에 값은 이상하게 나옴
		System.out.println("i5: " + i5);

		
		long l5 = (long)i3+i4; // 결과 : 4200000000
		System.out.println("l5: " + l5);
		
		int i6 = 10;
		long l6 = 4L; // long 타입 4
//		int i7 = i6+l6; // int가 long으로 자동 형 변환, 결과도 long이 됨.
		// long 타입이기 때문에 int에 담을 수 없음
//		int i7 = i6+(int)l6; // long을 int로 강제 형 변환하여 계산하거나
//		int i7 = (int)(i6+l6); // 계산한 결과(long)을 int로 강제 형 변환하면 int에 저장 가능
		long l7 = i6+l6;
		
		int i7 = 10;
		double d7 = 5.5;
		double d8 = i7 + d7; // 결과는 double, 10.5
		System.out.println("d8:[15.5?]" + d8);
		
		double d9 = 10/4;
		System.out.println("d9: " + d9); // 결과 : 2.0
		// 10, 4 는 int. 계산 결과도 int. 소수점 삭제
		// 계산 결과가 int -> double 로 자동 형 변환. 소수점 .0 붙음
		
		double d10 = 10.0/4;
		System.out.println("d10: " + d10); // 결과 : 2.5
		// 10.0 은 double. double과 int의 계산 결과는 double
		// double로 계산하니 소수점 살려서 2.50
		
		int x = 10;
		double d = x / 4;
		double dd = x*1.0 / 4; // 1.0 곱해서 double로 만들기
		// double dd = (double)x / 4;
		System.out.println("d: " + d + ", dd: " + dd);
				


		
		// 문자를 숫자로 바꾸기
		String s1 = "123";
		int i12 = Integer.parseInt(s1);
		System.out.println("i12: " + (i12 + 1));
		
//		String s2 = "123";
//		int i13 = (int)s2; // Cannot cast from String to int : 지원하지 않음
		
//		String s3 = "123a";
//		int i14 = Integer.parseInt (s3); // 에러 발생. 에러나 예외 발생 즉시 java 종료
//		System.out.println(i14);
//		// 에러메시지) NumberFormatException : 숫자 양식이 잘못됨
		
//		String s11 = "a";
//		char c11 = Character.parseChar (s11);
//		System.out.println("c11: " + (c11));
//		
		
		// 숫자를 문자로 바꾸기
		int i15 = 123;
		String str = String.valueOf(i15); // 정석
		System.out.println(str + 1); // 결과 : 1231
		
		String str1 = "" + i15; // 가장 쉬운 방법
		System.out.println(str1 + 1); // 결과 : 1231
	
	
	}

}
