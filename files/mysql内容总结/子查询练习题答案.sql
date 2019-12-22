/*1. 查出至少有一个员工的部门。显示部门编号、部门名称、部门位置、部门人数。*/
/*
列：部门编号、部门名称、部门位置、部门人数(分组)
列：dept、emp(部门人数没有员工表不行)
条件：没有
分组条件：人数>1

部门编号、部门名称、部门位置在dept表中都有，只有部门人数需要使用emp表，使用deptno来分组得到。
我们让dept和（emp的分组查询），这两张表进行连接查询
*/
SELECT
z.*,d.dname,d.loc
FROM dept d, (SELECT deptno, COUNT(*) cnt FROM emp GROUP BY deptno) z
WHERE z.deptno=d.deptno;

/**************************************************/

/*2. 列出薪金比关羽高的所有员工。*/
/*
列：所有
表：emp
条件：sal>关羽的sal，其中关羽的sal需要子查询
*/
SELECT *
FROM emp e
WHERE e.sal > (SELECT sal FROM emp WHERE ename='关羽')

/**************************************************/

/*3. 列出所有员工的姓名及其直接上级的姓名。*/
/*
列：员工名、领导名
表：emp、emp
条件：领导.empno=员工.mgr

emp表中存在自身关联，即empno和mgr的关系。
我们需要让emp和emp表连接查询。因为要求是查询所有员工的姓名，所以不能用内连接，因为曾阿牛是BOSS，没有上级，内连接是查询不到它的。
*/
SELECT e.ename, IFNULL(m.ename, 'BOSS') AS lead
FROM emp e LEFT JOIN emp m
ON e.mgr=m.empno;

/**************************************************/

/*4. 列出受雇日期早于直接上级的所有员工的编号、姓名、部门名称。*/
/*
列：编号、姓名、部门名称
表：emp、dept
条件：hiredate < 领导.hiredate

emp表需要查。部门名称在dept表中，所以也需要查。领导的hiredate需要查，这说明需要两个emp和一个dept连接查询
即三个表连接查询
*/
SELECT e.empno, e.ename, d.dname
FROM emp e LEFT JOIN emp m 
ON e.mgr=m.empno 
LEFT JOIN dept d ON e.deptno=d.deptno
WHERE e.hiredate<m.hiredate;

/**************************************************/

/*5. 列出部门名称和这些部门的员工信息，同时列出那些没有员工的部门。*/
/*
列：员工表所有列、部门名称
表：emp, dept
要求列出没有员工的部门，这说明需要以部门表为主表使用外连接
*/
SELECT e.*, d.dname
FROM emp e RIGHT JOIN dept d
ON e.deptno=d.deptno;

/**************************************************/

/*6. 列出所有文员的姓名及其部门名称，部门的人数。*/
/*
列：姓名、部门名称、部门人数
表：emp emp dept
条件：job=文员
分组：emp以deptno得到部门人数
连接：emp连接emp分组，再连接dept
*/
SELECT e.ename, d.dname, z.cnt
FROM emp e, (SELECT deptno, COUNT(*) cnt FROM emp GROUP BY deptno) z, dept d
WHERE e.deptno=d.deptno AND z.deptno=d.deptno;

/**************************************************/

/*7. 列出最低薪金大于15000的各种工作及从事此工作的员工人数。*/
/*
列：工作，该工作人数
表：emp
分组：使用job分组
分组条件：min(sal)>15000
*/
SELECT job, COUNT(*)
FROM emp e
GROUP BY job
HAVING MIN(sal) > 15000;

/**************************************************/

/*8. 列出在销售部工作的员工的姓名，假定不知道销售部的部门编号。*/
/*
列：姓名
表：emp, dept
条件：所在部门名称为销售部，这需要通过部门名称查询为部门编号，作为条件
*/
SELECT e.ename
FROM emp e
WHERE e.deptno = (SELECT deptno FROM dept WHERE dname='销售部');

/**************************************************/

/*9. 列出薪金高于公司平均薪金的所有员工信息，所在部门名称，上级领导，工资等级。*/
/*
列：员工所有信息(员工表)，部门名称(部门表)，上级领导(员工表)，工资等级(等级表)
表：emp, dept, emp, salgrade
条件：sal>平均工资，子查询
所有员工，说明需要左外
*/
SELECT e.*, d.dname, m.ename, s.grade
FROM emp e 
  NATURAL LEFT JOIN dept d
  LEFT JOIN emp m ON m.empno=e.mgr
  LEFT JOIN salgrade s ON e.sal BETWEEN s.losal AND s.hisal
WHERE e.sal > (SELECT AVG(sal) FROM emp);

/**************************************************/

/*10.列出与庞统从事相同工作的所有员工及部门名称。*/
/*
列：员工表所有列，部门表名称
表：emp, dept
条件：job=庞统的工作，需要子查询，与部门表连接得到部门名称
*/
SELECT e.*, d.dname
FROM emp e, dept d
WHERE e.deptno=d.deptno AND e.job=(SELECT job FROM emp WHERE ename='庞统');

/**************************************************/

/*11.列出薪金高于在部门30工作的所有员工的薪金的员工姓名和薪金、部门名称。*/
/*
列：姓名、薪金、部门名称(需要连接查询)
表：emp, dept
条件：sal > all(30部门薪金)，需要子查询
*/

SELECT e.ename, e.sal, d.dname
FROM emp e, dept d
WHERE e.deptno=d.deptno AND sal > ALL(SELECT sal FROM emp WHERE deptno=30)

/**************************************************/

/*12.列出在每个部门工作的员工数量、平均工资。*/
/*
列：部门名称, 部门员工数，部门平均工资
表：emp, dept
分组：deptno
*/
SELECT d.dname, e.cnt, e.avgsal
FROM (SELECT deptno, COUNT(*) cnt, AVG(sal) avgsal FROM emp GROUP BY deptno) e, dept d
WHERE e.deptno=d.deptno;
