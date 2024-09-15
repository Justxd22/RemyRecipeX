import requests

def test_proxy(proxy):
    try:
        response = requests.get("http://httpbin.org/ip", proxies={"http": proxy, "https": proxy}, timeout=5)
        if response.ok:
            print(f"Proxy {proxy} is working. Your IP: {response.json()['origin']}")
        else:
            print(f"Proxy {proxy} returned status code {response.status_code}")
    except Exception as e:
        print(f"Error occurred while testing proxy {proxy}: {e}")

def main():
    proxy = "http://8c5906b99fbd1c0bcd0f916d545c565a42973517d741fa1f5b1fef0cc91398e2052649793c455d3f05ed715fdc5414c663bd4280d867eef4d081dd8e3acf6006418497b4f327200a49ff18ac1d9bd786:29j9dga9b2eh@proxy.toolip.io:31112"
    test_proxy(proxy)

if __name__ == "__main__":
    main()

