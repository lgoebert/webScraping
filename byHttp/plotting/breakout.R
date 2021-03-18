library(ggplot2)

breakout_case <- read.csv("./files/ButterflyKnifeCaseHardenedWW.csv")
breakout_case$lowest_price
breakout_case$date <- as.POSIXct(as.numeric(breakout_case$date / 1000), origin="1970-01-01", tz="CET")
library(zoo)
breakout_case$lowest_price <- na.locf(breakout_case$lowest_price)
breakout_case$lowest_price
breakout_case$date
breakout_case$lowest_price <-gsub('[€]', '', breakout_case$lowest_price)
breakout_case$lowest_price <-gsub('-', '', breakout_case$lowest_price)
breakout_case$lowest_price
#TODO wenn preis zB 81--€ betreagt, "--" entfernen.
breakout_case$lowest_price <- as.numeric(breakout_case$lowest_price)
breakout_case$date 
as.POSIXct(breakout_case$date, origin="1970-01-01")
#p <- ggplot(data=breakout_case, aes(x = date,y = lowest_price))+
 # geom_line(stat="identity")

#p


print(breakout_case$date)
beginn <- as.numeric(as.POSIXct("2021-03-08 17:09:00"))
ende <- as.numeric(as.POSIXct("2021-03-19 19:14:00"))


pp <- ggplot(data=breakout_case, aes(x = date, y = lowest_price, group = 1)) +
  geom_line(stat="identity") + 
  theme(axis.text.x = element_text(angle = 90)) +
  scale_y_continuous(breaks = seq(from = 1, to = 3, by = 0.1)) +
  scale_x_continuous(breaks = seq(from = as.POSIXct(beginn, origin="1970-01-01") , to = as.POSIXct(ende, origin="1970-01-01"), by = 50000)) +
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
  ) +
  geom_smooth(method=lm) 

bb

ff <- ggplot(data=breakout_case, aes(x = date, y = lowest_price, group = 1)) +
  geom_line(stat="identity") + 
  theme(axis.text.x = element_text(angle = 45)) +
  scale_y_continuous(breaks = seq(from = 300, to = 600, by = 50)) +
  scale_x_continuous(breaks = seq(from = as.POSIXct(beginn, origin="1970-01-01") , to = as.POSIXct(ende, origin="1970-01-01"), by = 50000)) +
  labs(title = "Operation Breakout Case Price-chart",
       x = "Date",
       y = "Price"
  ) +
  geom_smooth(method=lm) 
ff

plot(breakout_case$date,breakout_case$lowest_price,
     main = "Footprint im Bezug auf Foederalismus",
     xlab="Foederalismus",
     ylab="Ecological Footprint of Consumption",
     breaks = 10,
     pch=16) 

