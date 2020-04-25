USE pantryDB;

CREATE TABLE User (
    ID INT NOT NULL AUTO_INCREMENT,
    Username VARCHAR(50),
    CognitoID VARCHAR(255),
    IsValidated BOOLEAN,
    MealPreferenceID INT DEFAULT 1,
    PRIMARY KEY (ID),
    FOREIGN KEY (MealPreferenceID) REFERENCES MealPreferenceType(ID)
);

CREATE TABLE MealPreferenceType (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(50),
    PRIMARY KEY (ID)
)

CREATE TABLE UserProfile (
    ID INT NOT NULL AUTO_INCREMENT,
    ProfileName VARCHAR(50),
    UserID INT,
    IsActive TINYINT(1) DEFAULT 0
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES User(ID)
);

-- TODO: Unused
CREATE TABLE IngredientCategories (
    ID INT NOT NULL AUTO_INCREMENT,
    CategoryName VARCHAR(50),
    PRIMARY KEY (ID)
);

-- TODO: Unused
CREATE TABLE AmountUnits (
    ID INT NOT NULL AUTO_INCREMENT,
    UnitName VARCHAR(50),
    PRIMARY KEY (ID)
);

CREATE TABLE Ingredient (
    ID INT NOT NULL AUTO_INCREMENT,
    IngredientName VARCHAR(200),
    IngredientImgURL VARCHAR(255),
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
    CookTime INT DEFAULT 0,
    IngredientCount INT DEFAULT 0,
    ImgURL VARCHAR(25) DEFAULT '',
    Servings INT DEFAULT 0,
    Summary TEXT,
    HealthScore FLOAT,
    WeightWatcherPoints INT DEFAULT NULL,
    Vegetarian TINYINT(1) DEFAULT 0,
    Vegan TINYINT(1) DEFAULT 0,
    GlutenFree TINYINT(1) DEFAULT 0,
    DairyFree TINYINT(1) DEFAULT 0,
    Healthy TINYINT(1) DEFAULT 0,
    Sustainable TINYINT(1) DEFAULT 0,
    PRIMARY KEY (ID)
);

CREATE TABLE RecipeListItem (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    IngredientID INT,
    Amount FLOAT,
    AmountUnitID VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID),
    FOREIGN KEY (IngredientID) REFERENCES Ingredient(ID)
);

CREATE TABLE Directions (
    ID INT NOT NULL AUTO_INCREMENT,
    RecipeID INT,
    SortOrder INT,
    Direction TEXT,
    PRIMARY KEY (ID),
    FOREIGN KEY (RecipeID) REFERENCES Recipe(ID)
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
--Removed FavoriteRecipes
--Removed DietType From User Profile
