"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WeatherCard() {
  const [city, setCity] = useState<string>("");
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    if (!city) return;
    fetch(`https://weather.tsukumijima.net/api/forecast?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, [city]);
  const handleValuechange = (value: string) => {
    setCity(value);
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>天気API(3日間)</CardTitle>
        <CardDescription>
          By
          <Button variant={"link"} asChild>
            <Link
              href={"https://weather.tsukumijima.net/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              https://weather.tsukumijima.net/
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select onValueChange={handleValuechange}>
          <SelectTrigger>
            <SelectValue placeholder="都道府県名を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="130010">東京</SelectItem>
            <SelectItem value="270000">大阪</SelectItem>
            <SelectItem value="110010">埼玉</SelectItem>
          </SelectContent>
        </Select>
        {data && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>
                  {data.publicTimeFormatted} 発表
                </CardDescription>
              </CardHeader>
              <CardContent className="flex w-full justify-between gap-3">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>今日</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>天気: {data.forecasts[0].telop}</p>
                    <p>
                      最高気温: {data.forecasts[0].temperature.max?.celsius}℃
                    </p>
                    <p>
                      最低気温: {data.forecasts[0].temperature.min?.celsius}℃
                    </p>
                  </CardContent>
                  <CardFooter>
                    <img src={data.forecasts[0].image.url} alt="天気アイコン" />
                  </CardFooter>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>明日</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>天気: {data.forecasts[1].telop}</p>
                    <p>
                      最高気温: {data.forecasts[1].temperature.max?.celsius}℃
                    </p>
                    <p>
                      最低気温: {data.forecasts[1].temperature.min?.celsius}℃
                    </p>
                  </CardContent>
                  <CardFooter>
                    <img src={data.forecasts[1].image.url} alt="天気アイコン" />
                  </CardFooter>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>明後日</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>天気: {data.forecasts[2].telop}</p>
                    <p>
                      最高気温: {data.forecasts[2].temperature.max?.celsius}℃
                    </p>
                    <p>
                      最低気温: {data.forecasts[2].temperature.min?.celsius}℃
                    </p>
                  </CardContent>
                  <CardFooter>
                    <img src={data.forecasts[2].image.url} alt="天気アイコン" />
                  </CardFooter>
                </Card>
              </CardContent>
              <CardFooter>{new Date().toLocaleString()}取得</CardFooter>
            </Card>
          </>
        )}
      </CardContent>
      <CardFooter>
        By
        <Button variant={"link"} asChild>
          <Link
            href={"https://github.com/teruhasi"}
            rel="noopener noreferrer"
            target="_blank"
          >
            @teruhasi
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
