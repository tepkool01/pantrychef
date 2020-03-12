USE pantryDB;

CREATE TABLE User (
    ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(50),
    CognitoID VARCHAR(255),
    IsValidated BOOLEAN,
    PRIMARY KEY (ID)
);

CREATE TABLE UserProfile (
    ID INT NOT NULL AUTO_INCREMENT,
    ProfileName VARCHAR(50),
    UserID INT,
    DietType INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

CREATE TABLE IngredientCategories (
    ID INT NOT NULL AUTO_INCREMENT,
    CategoryName VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE AmountUnits (
    ID INT NOT NULL AUTO_INCREMENT,
    UnitName VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE Ingredient (
    ID INT NOT NULL AUTO_INCREMENT,
    IngredientName VARCHAR(50),
    IngredientType VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE IngredientListItem (
    ID INT NOT NULL AUTO_INCREMENT,
    UserProfile INT,  
    IngredientID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserProfile) REFERENCES UserProfile(ID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(ID)
);

CREATE TABLE ShoppingListItem (
    ID INT NOT NULL AUTO_INCREMENT,
    UserProfile INT,  
    IngredientID INT,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserProfile) REFERENCES UserProfile(ID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(ID)
);

CREATE TABLE Recipe (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeName VARCHAR(255),
    CookTime INT,
    DietType VARCHAR(10),
    PRIMARY KEY (ID)
);

CREATE TABLE RecipeListItem (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    IngredientID INT,
    Amount FLOAT,
    AmountUnitID INT
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(ID),
    FOREIGN KEY (AmountUnitID) REFERENCES AmountUnits(ID)
);

--TODO:Remove This.
CREATE TABLE RecipeIngredients (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    IngredientList VARCHAR(900),
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID)
);

CREATE TABLE Directions (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    SortOrder INT,
    Directions VARCHAR(4850),
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
--Removed Field from Recipe Table
--Added RecipeIngredients Table
--Changed DietType to VARCHAR due to the conversation of having ALL and Vegetarian as options
--Removed inline comments
--Added Units
--Corrected AmountUnit to AmountUnits in the RecipeListItem Table
--Removed Ingredients List
--Added RecipeListItem
