package quiz.quiz2_0121;

import java.util.ArrayList;

public class Members {
	
	/** 문제 12 (회원가입, 로그인)
	 * 회원가입 받기
	 * 로그인 하기
	 * - 로그인 성공 시, "메인페이지" 출력
	 * - 로그인 실패 시, "다시 로그인 하세요" 출력
	 * 
	 * main에서 [회원](클래스)을 생성.
	 * - 단, 아이디, 비번 없이 생성 불가능
	 * 생성한 [회원] 목록이 필요
	 * "로그인"(메소드) 전달인자 아이디, 비번
	 * - 리턴은 로그인 성공여부
	 */
	
	String name;
	String id;
	String pw;
	
	String members;
	
//	ArrayList membersList = new ArrayList();

	Members (String name, String id, String pw) {
		this.name = name;
		this.id = id;
		this.pw = pw;
		
//		this.members = name + " | " + id + " | " + pw;
//		membersList.add(members);
	}
	
	
	
	void viewList (Members member) {

		this.members = this.name + " | " + this.id + " | " + this.pw;
		System.out.println(this.members);
		
//		for (int i=0; i<membersList.size(); i++) {
//			System.out.println(membersList.get(i));
//		}

	}

}
