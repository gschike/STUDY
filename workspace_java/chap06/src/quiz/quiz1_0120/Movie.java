package quiz.quiz1_0120;

public class Movie {
	
	String title;
	int year;
	
	void setTitle(String title) {
		if (title!=null) {
			this.title = title;
		} else {
			this.title = "n/a";
		}
	}
	
	void setYear(int year) {
		this.year = year;
	}
	
	String getTitle() {
		return this.title;
	}
	
	int getYear() {
		return this.year;
	}
	
	void viewInfo() {
		System.out.println("영화제목: " + getTitle());
		System.out.println("개봉년도: " + getYear());
		System.out.println();
	}
	
	String next() {
		this.title = this.title + "2";
		return this.title;
	}
	
//	String nextTitle() {
//		this.title = this.title + "2";
//		return this.title;
//	}
//	
//	int nextYear() {
//		this.year = this.year + 1;
//		return this.year;
//	}
	
	void nextMovie() {
		this.title = this.title + 2;
		this.year = this.year + 1;
	}


}
