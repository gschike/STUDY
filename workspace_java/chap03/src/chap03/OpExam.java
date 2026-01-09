package chap03;

public class OpExam {

	public static void main(String[] args) {
		
		
		// 증감연산자
		int x = 10;
		
		// ++ : 1을 증가, -- : 1을 감소
		x++;
		System.out.println("x++: " + x); // 11
		
		x = 10;
//		x = x + 1;
		x += 1; // 위의 식의 축약형, 나한테 +1 을 해서 나한테 다시 대입할 때
		System.out.println("x: " + x); // 11
		
		// 실생활에 += 1 을 할 경우가 많기 때문에 증감연산자로 축약하여 사용
		//---------- x++ == (x += 1) == (x = x + 1) ----------//
		// 단, +1, -1만 가능
		
		
		x = 10;
		++x;
		System.out.println("++x: " + x); // 11
		
		x = 10;
		x--; // 9
		--x; // 8
		System.out.println("x: " + x); // 8
		
		System.out.println();
		System.out.println("----------------");
		System.out.println();
		//////////
		
		x = 10;
		int z;
		z = ++x; // ++x : x += 1연산 후에 z = x
		System.out.println("z: " + z); // 11
		System.out.println("x: " + x); // 11
		
		System.out.println();
		
		x = 10;
		z = x++; // x++ : z = x 연산 후에 x += 1
		System.out.println("z: " + z); // 10
		System.out.println("x: " + x); // 11
		
		
		x = 10;
		System.out.println(("x++: " + x++) + (", x: " + x)); // 10, 11
		// ++ 는 항을 넘어갈 때 연산
		
		x = 10;
		System.out.println(("++x: " + ++x) + (", x: " + x)); // 11, 11
		
		
		x = 10;
		// 10 + 12
		z = x++ + ++x; //21?
		System.out.println("z: " + z); // 22
		
		/* z = x = 10;
		 * x++ ; x = 11;
		 * ++x = 11+1 = 12;
		 * z + 12 = 22;
		 */
		
		x = 1;
		z = x++ - --x * x++ - x--;
		// z와 x의 출력값
		
		System.out.println("z: " + z); // -2
		System.out.println("x: " + x); // 1
		
		
		int a = 5;
		a++;
		
		System.out.println("a: " + a); // 6
		
		
		int b = 10;
		
		System.out.println("b: " + b++); // 10 
		System.out.println("b: " + b); // 11
		
		
		x = 3;
		int y = ++x;
		
		System.out.println("x: " + x); // 3? -> 4
		System.out.println("y: " + y); // 4
		
		
		x = 5;
		//  5   +   7 - 7
		z = x++ + ++x - x--;
		
		System.out.println("x: " + x); // 6
		System.out.println("z: " + z); // 5
		
		
		x = 1;
		System.out.println(x++); // 1
		System.out.println(x++); // 2
		System.out.println(x++); // 3
		System.out.println(x++); // 4
		
		
		
		
		/////////////////////////////////////////
		
		b = 10;
//		int c = b/0; // 컴파일은 되는데, 실행 시에 에러 발생
		// 컴퓨터에서 나누기는 뺄 수 있을 때까지 빼기. 0은 무한으로 빼기 때문에 오류 발생
//		System.out.println("b/0: " + c);
		
		double d = 7.3;
		double e = d/0;
		System.out.println("d/0: " + e); // 결과 : Infinity
		// double/0 은 오류 발생하지 않음
		
		
		
		/////////////////////////////////////
		
		int f = 10 % 3; // 나머지 (oracle : mod(modulate))
		System.out.println("10 % 3 : " + f);
		// 실무에서는 가짓수를 제한하여 가둘 때
		/* ex) 로또번호 1~45
		 * % 44 = 0~44
		 * +1 = 1~45
		 */
		// 특징이 0~나머지 하는 숫자보다 1 작은 수
		
		System.out.println("--------------");
		
		int num = 354;
		int n00 = num/100;
		int n0 = (num%100)/10;
		int n = (num%10)/1;
		System.out.printf("백의 자리: %d, 십의 자리: %d, 일의 자리:%d", n00, n0, n);
		
		System.out.println();
		
		System.out.println("--------------");
		////////////////////////////////////////
		
		System.out.println(0.1);
		System.out.println(0.1f);
		System.out.println(0.1==0.1f); // false : 부동 소수점 때문
		System.out.println(0.1<0.1f); // true : 0.1f는 근사값인 0.10000000149011612 로 저장됨
		// 소수점은 근사치로 저장됨
		//// 그나마 같은 타입으로 변환해서 비교하면 수월해짐 (무조건 되는 건 아니지만 오류가 적어짐)
		System.out.println(1 == 1.0); // true
		
		
		///// String 비교
		String s1 = "s1";
		String s2 = "s1";
		System.out.println(s1 == s2); // true가 나오긴 함, 그러나 string일 때 특수한 경우임
		// 글씨는 무조건 equals로 비교함 : 대상.equals(비교할값)
		System.out.println(s1.equals(s2)); // true
		
		System.out.println("adhf".equals(s1)); // ""안에 값과도 비교 가능함
		System.out.println(s1.equals("dafa")); // ""안에 값과도 비교 가능함
		
		
		
		System.out.println("--------------");
		/////////////////////////////////////////
		int c1 = 22;
		int c2 = 4;
		System.out.println("몫: " + c1/c2);
		System.out.println("나머지: " + c1%c2);
		//////////////////////////////////////////
		System.out.println("--------------");
		
		
		
		// 문제1
		// 난 돈이 10,000원 있음
		
		int money = 10000;
		// 1. 4,500원 짜리 쌍화차를 최대 몇 잔 마실 수 있는가
		int cup = 4500;
		System.out.printf("최대: %d개", money/cup);
		System.out.println();
		
		// 2. 잔돈 얼마?
		System.out.printf("잔돈: %d원", money%cup);
		System.out.println();
		
		
		
		// 문제2
		// 올영에서 꿀홍차가 8,0000원인데, 15% 세일
		// 가격은?
		
		int honey = 8000;
		int sale = 15;
		System.out.println("가격: " + (honey*(100-sale))/100 + "원");
		
		double sale2 = (double)sale/100;
		System.out.println("가격: " + honey*(1 - sale2) + "원");
		
		
		// 문제 3-0
		int nn = 1234;
		int nnn = (1234/100)*100;
				
		System.out.println(nnn);		
		// 문제3-1
		double v1 = 1000;
		double v2 = 794.0;
		
		// v1/v2
		System.out.println("v1/v2: " + v1/v2);
		// 를 소숫점 셋째자리까지만
		
//		double v3 = (double)(v1/v2)*1000;
//		System.out.println(v3);
//		int v4 = (int)v3;
//		System.out.println(v4);
//		double v5 = v4/1000; // int/int 한 후에 double로 바뀌어서 1.0 나옴
//		double v5 = (double)v4/1000;
//		double v5 = v4/1000.0; // 둘 중 하나 double로
//		double v5 = v4*0.001; // 1.23590000001 : 부동 소수점 때문
//		System.out.println(v5);
		
		double v3 = (v1/v2)*1000; // 1259.0
		double v4 = (int)v3/1000.0;
		System.out.println("문제 3-1: " + v4);
		
		int h3 = (int)(v1/v2*1000); // 1259
		double h4 = h3/1000.0;
		System.out.println("문제 3-1: " + h4);
		
		
		
		System.out.println("------- 문제 4 -------");
		
		// 문제 4
		// 17,000원
		// 5천원 몇 장, 천 원 몇 장?
		
		int have = 17000;
		int five = have/5000;
		int one = (have%5000)/1000;
		System.out.printf("오천 원: %d장, 천 원: %d장", five, one);
		System.out.println();
		
		int one2 = (have-(five*5000))/1000;
		System.out.printf("오천 원: %d장, 천 원: %d장", five, one2);
		System.out.println();
		
		System.out.println("---------------------");
		
		int m1 = 17000;
		int m2 = 5000;
		int m3 = 1000;
		
		int m5000 = m1/m2;
		//1
		int extra1 = m1 - m5000*m2;
		//2
		int extra2 = m1%m2;
		
		int m1000 = extra1/m3;
		System.out.printf("오천 원: %d장, 천 원: %d장", m5000, m1000);
		System.out.println();
		
		
		
		// 비트 연산자
		/*  8421
		 *  1010 = 10
		 *& 1100 = 12
		 *--------
		 * 	1000 -> 둘 다 참(1)인 것만 참
		 * 
		 * 검증할 때 주로 사용.
		 * 예를 들어, 전등 4개 중 앞에 2개가 켜져 있는지 확인하고 싶음 = & 1100
		 * 켜져 있으면 1, 꺼져 있으면 0 나옴
		 * 
		 * 
		 * 뭔지 모르는 거 검사하고 싶음
		 * 첫번째 세번째 장비 켜져있냐?
		 * & 1010
		 * ------- 결과가
		 *   0010 = 2 나오면
		 * -> 첫번째 꺼져있고, 세번째 켜져있음
		 * 
		 * 
		 * or 연산 : 켜져있는지 꺼져있는지 모르지만, 해당하는 거 켜고 싶을 때!
		 * 
		 *   1011
		 * | 0001 -> 마지막 꺼 켜고 싶음
		 * -------
		 *   1011
		 *   
		 * >>, << = shift 연산자
		 * 
		 * 2 >> 1 : 2를 오른쪽으로 한 칸 밀어줘
		 * 0010 -> 0001 = 1
		 * 
		 * 8 >> 1
		 * 1000 -> 0100 = 4
		 * 
		 * >> = 나누기 2 효과
		 * << = 곱하기 2 효과
		 *
		 */
		
		
		System.out.println("------- 삼항 연산자 ?: -------");
		
		int score = 85;
		// if문의 축약형
		String grade = (score>=90)? "A":"B";
		System.out.println("등급은: " + grade + "입니다");
		
		// 중첩 가능
		score = 75;
		// 조건 괄호 필수는 아님
		grade = score>=90? "A" : ((score>=80)? "B" : "C");
		System.out.println("등급은: " + grade + "입니다");
		
		
		
			
	}

}
