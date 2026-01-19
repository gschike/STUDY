import java.util.ArrayList;
import java.util.Scanner;

public class Calculator {
	
	double plus (double a, double b) {
		double result = a+b;
		System.out.println(result);
		return result;
	}
	
	double minus (double a, double b) {
		double result = a-b;
		System.out.println(result);
		return result;
	}
	
	double multiple (double a, double b) {
		double result = a*b;
		System.out.println(result);
		return result;
	}
	
	double divide (double a, double b) {
		double result = a/b;
		
		if (b==0) {
			System.out.println("0으로 나눌 수 없습니다");
			result = 0;
		}
		
		System.out.println(result);
		return result;
	}
	
	int remain (double a, double b) {
		int result = (int)(a%b);
		System.out.println(result);
		return result;
	}
	
	
	
	Calculator () {
		
		double a = 0;
		double b = 0;
		String c = "";

		ArrayList expression = new ArrayList();
		
		System.out.println("수식을 입력하세요");
		
		Scanner scanner = new Scanner(System.in);
		expression.add(scanner.next());
		expression.add(scanner.next());
		expression.add(scanner.next());
		
		a = Double.parseDouble((String)expression.get(0));
		b = Double.parseDouble((String)expression.get(2));
		c = (String) expression.get(1);
		
		if ("+".equals(c)) {
			plus (a, b);
		} else if ("-".equals(c)) {
			minus (a, b);
		} else if ("*".equals(c)) {
			multiple (a, b);
		} else if ("/".equals(c)) {
			divide (a, b);
		} else if ("%".equals(c)) {
			remain (a, b);
		} else {
			System.out.println("잘못 입력하셨습니다.");
		}
		
	}
	
	
	
	
	
	
	
	
	
}
