CREATE TABLE Marketplace(
	'id': int(11) NOT NULL,
    'TokenName': varchar(20) NOT NULL,
    'TokenType': varchar(20) NOT NULL,
    'TokenPlice': int(11) NOT NULL,
    'Seller_UserId': varchar(255) NOT NULL,
    'NFTType': varchar(20) NOT NULL,
    'Saleslicense': BOOLEAN NOT NULL,
    'MessageCardTotal': int(11) NOT NULL,
    'TokenSalesAmount': int(11) NOT NULL,
    'Numbersofsales': int(11) NOT NULL
);

CREATE TABLE SellerInfo(
    'user_id': varchar(255) NOT NULL,
    'timestamp': varchar(30) NOT NULL,
    'TxHashID': varchar(255) NOT NULL,
    'TokenName': varchar(20) NOT NULL,
    'TokenType': varchar(20) NOT NULL,
    'Action': varchar(20) NOT NULL,
    'TokenPrice': int(11) NOT NULL 
);

CREATE TABLE BuyerInfo(
    'user_id': varchar(255) NOT NULL,
    'timestamp': varchar(30) NOT NULL,
    'TxHashID': varchar(255) NOT NULL,
    'TokenName': varchar(20) NOT NULL,
    'TokenType': varchar(20) NOT NULL,
    'TokenPrice': int(11) NOT NULL 
);

CREATE TABLE ShoppingBasket(
    'User_ID': varchar(255) NOT NULL,
    'TokenType': varchar(20) NOT NULL,
    'TokenName': varchar(20) NOT NULL,
    'TokenQuantity': int(11) NOT NULL,
    'TokenPrice': int(11) NOT NULL,
    'Seller_UserID': varchar(255) NOT NULL
);