-- Query 1: Customers who used United Package.
-- Count qualifying orders once, even when an order has multiple line items.
-- Order value is calculated from each line item's quantity and product price.
SELECT
    c.CustomerName,
    c.Country,
    COUNT(DISTINCT o.OrderID) AS OrderCount,
    SUM(od.Quantity * p.Price) AS TotalOrderValue
FROM Customers AS c
INNER JOIN Orders AS o
    ON o.CustomerID = c.CustomerID
INNER JOIN Shippers AS s
    ON s.ShipperID = o.ShipperID
INNER JOIN OrderDetails AS od
    ON od.OrderID = o.OrderID
INNER JOIN Products AS p
    ON p.ProductID = od.ProductID
WHERE s.ShipperName = 'United Package'
GROUP BY
    c.CustomerID,
    c.CustomerName,
    c.Country
ORDER BY
    TotalOrderValue DESC,
    c.CustomerName ASC;

-- Query 2: Customers with at least one order but no United Package orders.
-- EXISTS excludes customers who have never ordered and NOT EXISTS excludes
-- customers who used United Package even once.
SELECT
    c.CustomerName,
    c.Country
FROM Customers AS c
WHERE EXISTS (
    SELECT 1
    FROM Orders AS o
    WHERE o.CustomerID = c.CustomerID
)
AND NOT EXISTS (
    SELECT 1
    FROM Orders AS o
    INNER JOIN Shippers AS s
        ON s.ShipperID = o.ShipperID
    WHERE o.CustomerID = c.CustomerID
      AND s.ShipperName = 'United Package'
)
ORDER BY
    c.CustomerName ASC,
    c.Country ASC;
