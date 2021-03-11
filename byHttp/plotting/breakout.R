library(ggplot2)

breakout_case <- read.csv("./all_items/operationBreakout.csv")

p <- ggplot(data=breakout_case, aes(x = date,y = lowest_price))+
  geom_line(stat="identity")


pp <- ggplot(data=breakout_case, aes(x = date, y = lowest_price, group = 1)) +
  geom_line() + 
  theme(axis.text.x = element_text(angle = 90)) +
  labs(title = "Operation Breakout Case Price-chart",
        x = "Date",
       y = "Price"
       )
pp

tester <- ggplot(data = breakout_case,aes(x=date,y=lowest_price))+geom_bar(stat = "identity")
tester

bb <- ggplot(breakout_case, aes(x=date, y=lowest_price)) +
  geom_point()+
  theme(axis.text.x = element_text(angle = 90)) +
  labs(title = "Operation Breakout Case Price-chart",
       x = "Date",
       y = "Price"
  )+
  geom_smooth(method=lm) 

