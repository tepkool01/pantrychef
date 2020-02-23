USE pantryDB;

CREATE TABLE User (
    ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(50),
    CognitoID VARCHAR(255),
    IsValidated BOOLEAN,
    PRIMARY KEY (ID)
);

CREATE TABLE IngredientList (
    ID INT NOT NULL AUTO_INCREMENT,
    ListType VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE UserProfile (
    ID INT NOT NULL AUTO_INCREMENT,
    ProfileName VARCHAR(50),
    UserID INT,
    DietType INT,
    PantryList INT,
    ShoppingList INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES User(ID),
    FOREIGN KEY (PantryList) REFERENCES IngredientList(ID) ON DELETE CASCADE,
    FOREIGN KEY (ShoppingList) REFERENCES IngredientList(ID) ON DELETE CASCADE
);

CREATE TABLE Ingredient (
    ID INT NOT NULL AUTO_INCREMENT,
    IngredientName VARCHAR(50),
    IngredientType VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE IngredientListItem (
    ID INT NOT NULL AUTO_INCREMENT,
    ListID INT,  
    IngredientID INT,
    Amount float,
    UnitType VARCHAR(25),
    ExpirationDate Date, 
    PRIMARY KEY (ID),
    FOREIGN KEY (ListID) REFERENCES IngredientList(ID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(ID)
);

CREATE TABLE Recipe (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeName VARCHAR(255),
    CookTime INT,
    DietType INT,
    Field VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE Directions (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    SortOrder INT,
    Directions VARCHAR(255),
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID)
);

CREATE TABLE FavoriteRecipes (
    ID INT NOT NULL AUTO_INCREMENT,
    UserProfileID INT,
    RecipeID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID),
    FOREIGN KEY (UserProfileID) REFERENCES UserProfile(ID)
);

--Changes:
--Added DataTypes to all values.
--Added User ID and IsValidated.
--Renamed Ingredient Name and Type to IngredientName and IngredientType respectively.
--Renamed IngrediantList SourceTable to ListType. Removed Source_ID.
--Removed the underscore from all Foriegn Keys.
--Renamed Directions Order to SortOrder.
--Removed Max to 255
--Removed inline comments