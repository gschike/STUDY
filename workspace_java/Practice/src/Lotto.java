
public class Lotto {

	public static void main(String[] args) {
		
		boolean[] all = new boolean[45]; // 45개 중에
		int[] lotto = new int[6]; // 6개 뽑을 거임
		
//		for (int i=0; i<lotto.length;) {
//			
//			int pick = (int)(Math.random()*45);
//			
//			if (all[pick]==false) {
//				lotto[i] = pick+1;
//				all[pick] = true;
//				i++;
//			}
//		}
		
		int count = 0;
		
		do {
			int pick = (int)(Math.random()*45);
			
			if (all[pick]==false) {
				lotto[count] = pick+1;
				all[pick] = true;
				count++;
			}
			
		} while (count == 6);
		
		for (int i=0; i<lotto.length; i++) {
			System.out.print(lotto[i] + " ");
		}
		
		
		
		

	} // method end

} // field end
