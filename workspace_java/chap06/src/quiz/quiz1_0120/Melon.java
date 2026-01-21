package quiz.quiz1_0120;

import java.util.ArrayList;

public class Melon {

	/** 문제2 (음악)
	 * 멜론 차트 관리하는 시스템
	 * 
	 * 목록을 관리하기 위해 클래스를 생성
	 * : 제목, 가수, 앨범명, 가사, 음악길이(초단위)
	 * 
	 * - 곡 2곡 이상의 정보를 저장
	 * - ViewInfo(method): 각 곡의 정보를 출력
	 * 
	 */
	
	String title;
	String artist;
	String album;
	String lyrics;
	int time = 0;

	ArrayList<ArrayList> songs = new ArrayList<>();
	ArrayList song = new ArrayList();
	
	void putInfo() {
		
		
		song.add("제목: " + this.title);
		song.add("가수: " + this.artist);
		song.add("앨범명: " + this.album);
		song.add("가사: " + this.lyrics);
		song.add("길이: " + this.time);
		song.add("");
		
		songs.add(song);
		
	}
	
	void viewInfo () {
		
		System.out.println("제목: " + title);
		System.out.println("가수: " + artist);
		System.out.println("앨범명: " + album);
		System.out.println("가사: " + lyrics);
		System.out.println("길이: " + time + "초");
		
	}
	
	void viewAllSongs () {
		
		for (int i=0; i<song.size(); i++) {
				System.out.println(song.get(i));
		} // i end
		
	}
	
	
	
} // end
