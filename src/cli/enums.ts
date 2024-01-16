export enum GsaGraphQLTypes {
	String = "String",
	Int = "Int",
	Float = "Float",
	Boolean = "Boolean",
	Date = "Date",
	NullableString = "NullableString", // generates (string | null) type
	NullableInt = "NullableInt",
	NullableFloat = "NullableFloat",
	NullableBoolean = "NullableBoolean",
	NullableDate = "NullableDate",
}

export enum FilterOperators {
	Equal = "EQUAL",
	NotEqual = "NOT_EQUAL",
	GreaterThan = "GREATER_THAN",
	GreaterThanOrEqual = "GREATER_THAN_OR_EQUAL",
	LessThan = "LESS_THAN",
	LessThanOrEqual = "LESS_THAN_OR_EQUAL",
	Like = "LIKE",
	ILike = "I_LIKE",
}
