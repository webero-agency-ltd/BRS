
export default function randomDate( start : Date = new Date(2019, 0, 1), end : Date = new Date() ) : Date {
	
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

}
