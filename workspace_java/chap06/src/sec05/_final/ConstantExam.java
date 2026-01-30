package sec05._final;

public class ConstantExam {
	
	/** ARS
	 * "상품 문의"
	 * "고장 문의"
	 */
	
	static int statusCheck (String request) {
		if ("상품 문의".equals(request)) {
			return Constant.OK;
		} else {
			return Constant.E03;
		}
	}
	
	
	// main
	public static void main(String[] args) {
		
		int as = statusCheck("고장 문의");	
		if (as == Constant.E03) {
			System.out.println("냉매 충전에 필요합니다");
		} else if (as == Constant.OK) {
			System.out.println("조치할 필요가 없습니다");
		}
		
		
	} // method end

} // field end
